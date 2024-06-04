require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const corOptions = require("./config/corsOptions")
const userModel = require("./models/User")
const movieModel = require("./models/Movie")
const PORT = process.env.PORT || 5000
const cookieParser = require("cookie-parser")
const path = require("path")
const { logger } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const connectDB = require("./config/dbConn")
const { logEvents } = require("./middleware/logger")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const verifyUser = require("./middleware/verifyUser")
const authRoutes = require("./routes/authRoutes")
const movieRoutes = require("./routes/movieRoutes")

connectDB()

app.use(logger)

app.use(express.json())

// app.use(cookieParser())

// app.use(cors(corOptions))

app.use("/", express.static(path.join(__dirname, "/public")))

app.use("/", require("./routes/root"))
app.use("/users", require("./routes/userRoutes"))
app.use("/auth", require("./routes/authRoutes"))

//Mount the auth routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", movieRoutes)

app.get("/api/refresh", verifyUser, (req, res) => {
  try {
    const { user } = req
    const token = jwt.sign(
      {
        email: user.email,
        username: user.name,
        phone: user.phone,
        roles: user.roles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    )
    return res.status(201).send(token)
  } catch (err) {
    return res.status(500).send(err)
  }
})

app.get("/api/user", (req, res) => {
  userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})

app.get("/api/movie", (req, res) => {
  movieModel
    .find()
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err))
})

app.post("/api/register", async (req, res) => {
  const oldUser = await userModel.findOne({ email: req.body.email })
  const { name, email, password, phone, roles } = req.body
  if (oldUser) {
    return res.json({ error: "Email already exists" })
  } else {
    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await userModel
          .create({ name, email, password: hash, phone, roles })
          .then((users) => res.json(users))
          .catch((err) => res.json(err))
      })
      .catch((err) => console.log(err.message))
  }
})

app.post("/api/createMovie", async (req, res) => {
  const oldMovie = await movieModel.findOne({ name: req.body.name })
  if (oldMovie) {
    return res.json({ error: "Movie already exists" })
  } else {
    await movieModel
      .insertMany(req.body)
      .then((movies) => res.json(movies))
      .catch((err) => res.json(err))
  }
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.json("The password is incorrect")
          }
          if (response) {
            const accessToken = jwt.sign(
              {
                email: user.email,
                username: user.name,
                phone: user.phone,
                roles: user.roles,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1m" }
            )
            const refreshToken = jwt.sign(
              {
                email: user.email,
                username: user.name,
                phone: user.phone,
                roles: user.roles,
              },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            )
            res.cookie("accessToken", accessToken, { maxAge: 60000 })
            res.cookie("refreshToken", refreshToken, {
              maxAge: 300000,
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            })
            const { password, ...others } = user._doc
            return res
              .status(201)
              .json({ email: others, accessToken, refreshToken })
          } else {
            return res.status(401).send(err || "The password is incorrect")
          }
        })
      } else {
        return res.status(404).send("Email not found")
      }
    })
    .catch((err) => {
      return res.status(500).send(err)
    })
})

app.post("/api/logout", (req, res) => {
  res.cookie("accessToken", "", { maxAge: 1 })
  res.cookie("refreshToken", "", { maxAge: 1 })
  res.send("Logged out")
})

app.get("/api/protected", verifyUser, (req, res) => {
  try {
    return res.status(201).send("Protected route")
  } catch (err) {
    return res.status(500).send({ err })
  }
})

app.post("/api/user-data", async (req, res) => {
  try {
    const userEmail = userModel.email
    userModel
      .findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data })
      })
      .catch((err) => {
        res.send({ status: "error", data: err })
      })
  } catch (err) {
    console.log(err)
  }
})

app.get("/api/user/get/:id", (req, res) => {
  const id = req.params.id
  userModel
    .findById(id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})

app.post("/api/user/create", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})

app.put("/api/user/update/:id", (req, res) => {
  const id = req.params.id
  userModel
    .findByIdAndUpdate(
      { _id: id },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        roles: req.body.roles,
      }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})

app.delete("/api/user/delete/:id", (req, res) => {
  const id = req.params.id
  userModel
    .findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

app.get("/api/movie/get/:id", (req, res) => {
  const id = req.params.id
  movieModel
    .findById(id)
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err))
})

app.post("/api/movie/create", (req, res) => {
  movieModel
    .create(req.body)
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err))
})

app.put("/api/movie/update/:id", (req, res) => {
  const id = req.params.id
  movieModel
    .findByIdAndUpdate(
      { _id: id },
      {
        movieName: req.body.movieName,
        movieImg: req.body.movieImg,
        movieRating: req.body.movieRating,
        ageLimit: req.body.ageLimit,
      }
    )
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err))
})

app.delete("/api/movie/delete/:id", (req, res) => {
  const id = req.params.id
  movieModel
    .findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

var menus = [
  {
    name: "Phim",
    isShowSubmenu: false,
    child: [
      {
        name: "Phim đang chiếu",
      },
      {
        name: "Phim sắp chiếu",
      },
    ],
  },
  {
    name: "Góc điện ảnh",
    isShowSubmenu: false,
    child: [
      {
        name: "Thể Loại Phim",
      },
      {
        name: "Diễn Viên",
      },
      {
        name: "Đạo Diễn",
      },
      {
        name: "Bình Luận Phim",
      },
      {
        name: "Blog Điện Ảnh",
      },
    ],
  },
  {
    name: "Sự kiện",
    isShowSubmenu: false,
    child: [
      {
        name: "Ưu Đãi",
      },
      {
        name: "Phim Hay Tháng",
      },
    ],
  },
  {
    name: "Rạp/Giá Vé",
    isShowSubmenu: false,
    child: [
      {
        name: "Galaxy Nguyễn Du",
      },
      {
        name: "Galaxy Sala",
      },
      {
        name: "Galaxy Tân Bình",
      },
      {
        name: "Galaxy Kinh Dương Vương",
      },
      {
        name: "Galaxy Quang Trung",
      },
      {
        name: "Galaxy Bến Tre",
      },
    ],
  },
]
var movieCats = [
  {
    name: "Đang chiếu",
  },
  {
    name: "Sắp chiếu",
  },
  {
    name: "Phim IMAX",
  },
]
var movies = [
  {
    name: "Cái Giá Của Hạnh Phúc",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/10/cai-gia-cua-hanh-phuc-3_1712733167355.jpg",

    movieRating: "9.6",
    ageLimit: "T18",
  },
  {
    name: "Lật Mặt 7: Một Điều Ước",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
    movieRating: "9.3",
    ageLimit: "K",
  },
  {
    name: "Vây Hãm: Kẻ Trừng Phạt",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/26/roundup-500_1714102279125.jpg",
    movieRating: "9.4",
    ageLimit: "T18",
  },
  {
    name: "Gấu Béo Tung Chưởng",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/17/gau-beo-500_1713345569505.jpg",
    movieRating: "7.7",
    ageLimit: "K",
  },
  {
    name: "Tà Khúc Triệu Vong",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/15/the-sin-500_1713166881724.jpg",
    movieRating: "7.4",
    ageLimit: "T18",
  },
  {
    name: "Mèo Mập Mang 10 Mạng",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/5/10-lives-500_1712291276946.jpg",
    movieRating: "9.5",
    ageLimit: "K",
  },
  {
    name: "Mùa Hè Của Luca",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/15/luca-sneak-500_1713170135558.jpg",
    movieRating: "9.5",
    ageLimit: "K",
  },
  {
    name: "Mobile Suit Gundam: Seed of Freedom",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/1/mobile-suit-gundam-seed-freedom-1_1711945409368.jpg",
    movieRating: "9.7",
    ageLimit: "T13",
  },
  {
    name: "Tarot",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/17/tarot-500_1713325464321.jpg",
    movieRating: "8.2",
    ageLimit: "T18",
  },
  {
    name: "Nikita",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/24/nikita_1713931198262.jpg",
    movieRating: "7",
    ageLimit: "T18",
  },
  {
    name: "Arthur: Chú chó kiên cường",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/24/arthur-500_1713947805055.jpg",
    movieRating: "8.2",
    ageLimit: "K",
  },
  {
    name: "Panda đại náo lãnh địa vua sư tử",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/11/panda-500_1712807666563.jpg",
    movieRating: "6.9",
    ageLimit: "K",
  },
  {
    name: "Abigail",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/26/abigail-500_1714116959247.jpg",
    movieRating: "7.9",
    ageLimit: "K",
  },
  {
    name: "Phim điện ảnh những tế bào của Yumi",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/10/yumi-500_1712732508312.jpg",
    movieRating: "7.1",
    ageLimit: "T13",
  },
  {
    name: "Haikyu!!: Trận chiến bãi phế liệu",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/5/6/haikyuu-the-dumpster-battle-1_1714971673660.jpg",
    movieRating: "9.9",
    ageLimit: "K",
  },
  {
    name: "Bad Boys:Ride Or Die",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/12/bad-boy-500_1712891792541.jpg",
    movieRating: "8,2",
    ageLimit: "K",
  },
  {
    name: "A Quite Place: Day One",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/2/27/a-quiet-place-500_1709005171116.jpg",
    movieRaing: "9.2",
    ageLimit: "K",
  },
  {
    name: "Despicable Me 4",
    movieImg:
      "https://cdn.galaxycine.vn/media/2024/4/4/dm-500_1712201980725.jpg",
    movieRating: "9.6",
    ageLimit: "K",
  },
]
var blogType = [
  {
    name: "Bình luận phim",
  },
  {
    name: "Blog điện ảnh",
  },
]
var slideImg = [
  {
    alt: "Hinh 1",
    ref: "https://cdn.galaxycine.vn/media/2024/4/15/digital-2048x682_1713193116776.jpg",
  },
  {
    alt: "Hinh 2",
    ref: "https://cdn.galaxycine.vn/media/2024/4/10/cai-gia-cua-hanh-phuc-2_1712733220607.jpg",
  },
  {
    alt: "Hinh 3",
    ref: "https://cdn.galaxycine.vn/media/2024/4/1/god-x-kong-2048_1711942313253.jpg",
  },
  {
    alt: "Hinh 4",
    ref: "https://cdn.galaxycine.vn/media/2024/4/10/ghostbusters-frozen-empire-2048_1712719876429.jpg",
  },
  {
    alt: "Hinh 5",
    ref: "https://cdn.galaxycine.vn/media/2024/4/15/luca-sneak-2048_1713170236165.jpg",
  },
  {
    alt: "Hinh 6",
    ref: "https://cdn.galaxycine.vn/media/2024/4/15/0324-galaxy-on-zalo-2048x683_1713169097223.jpg",
  },
]
var blogContent = [
  {
    blogImg: "https://www.galaxycine.vn/media/2024/4/27/750_1714201137911.jpg",
    blogTitle:
      "[Review] Lật Mặt 7 Một Điều Ước: Đi Suối Đời Lòng Mẹ Vẫn Theo Con",
    blogVote: "891",
  },
  {
    blogImg:
      "https://www.galaxycine.vn/media/2024/4/19/cai-gia-cua-hanh-phuc-chung-minh-dang-cap-cua-thai-hoa_1713508917220.jpeg",
    blogTitle:
      "[Review] Cái Giá Của Hạnh Phúc: Chứng Minh Đẳng Cấp Của Thái Hòa",
    blogVote: "526",
  },
  {
    blogImg: "https://www.galaxycine.vn/media/2024/4/16/750_1713249877552.jpg",
    blogTitle:
      "[Review] Ghostbusters Frozen Empire: Thương Hiệu Lừng Danh Giữ Vững Phong Độ Suốt 40 Năm",
    blogVote: "692",
  },
  {
    blogImg:
      "https://www.galaxycine.vn/media/2024/3/31/godzilla-x-kong-the-new-empire-khi-nha-lam-phim-chieu-fan-het-co-1_1711865460614.png",
    blogTitle:
      '[Review] Godzilla X Kong The New Empire: Khi Nhà Làm Phim "Chiều" Fan Hết Cỡ',
    blogVote: "102",
  },
  {
    blogImg:
      "https://www.galaxycine.vn/media/2024/5/7/750-chuan_1715072841658.jpg",
    blogTitle:
      "[Preview] Hành Tinh Khỉ Vương Quốc Mới: Tương Lai Nào Cho Loài Khỉ Khi Không Còn Caesar?",
    blogVote: "610",
  },
  {
    blogImg:
      "https://www.galaxycine.vn/media/2024/4/23/boc-tach-trailer-deadpool--wolverine-phan-dien-la-em-gai-giao-su-x1_1713863069247.jpg",
    blogTitle:
      "Bóc Tách Trailer Deadpool & Wolverine: Phản Diện Là Em Gái Giáo Sư X?",
    blogVote: "301",
  },
  {
    blogImg:
      "https://www.galaxycine.vn/media/2024/4/12/joker-folie-a-deux-harley-quinn-thay-doi-hoan-toan-so-voi-comic-2_1712891394699.jpg",
    blogTitle: "Joker 2: Harley Quinn Thay Đổi Hoàn Toàn So Với Comic?",
    blogVote: "352",
  },
  {
    blogImg:
      "https://www.galaxycine.vn/media/2024/4/5/phim-hai-750_1712308219444.jpg",
    blogTitle: "Top 10 Phim Hài Hay Nhất 2024",
    blogVote: "261",
  },
  {
    blogImg: "https://www.galaxycine.vn/media/2024/4/5/750_1712304565055.jpg",
    blogTitle: "Top 10 Phim Kinh Dị Hay Nhất 2024",
    blogVote: "196",
  },
]
var promoLists = [
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2024/1/19/1350x900_1705628944220.jpg",
    promoTitle: "Mưa Quà Tặng Cho Thành Viên Galaxy Cinema 2024",
  },
  {
    promoImg: "https://cdn.galaxycine.vn/media/2024/4/26/750_1714100181036.jpg",
    promoTitle:
      "Ngày Tri Ân Của Galaxy Cinema - Ngày Thứ Hai ĐẦu TIÊN Mỗi Tháng ",
  },
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2023/11/23/giaveu22-digital-1800x1200_1700731546949.jpg",
    promoTitle: "Giá Vé U22 - Chỉ Từ 45k",
  },
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2024/3/21/galaxy-studio-va-samsung-k-ket-hop-tac-chien-luoc--tai-dinh-nghia-su-ket-hop-giua-dien-anh--cong-nghe-6_1711006015662.jpg",
    promoTitle:
      "Galaxy Studio Và Samsung Ký Kết Hợp Tác Chiến Lược, Tái Định Nghĩa Sự Kết Hợp Giữa Điện Ảnh - Công Nghệ",
  },
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2023/5/23/quy-dinh-do-tuoi-digital-1350x900_1684835377244.jpg",
    promoTitle: "Tiêu Chí Phân Loại Phim Theo Lứa Tuổi",
  },
  {
    promoImg: "https://cdn.galaxycine.vn/media/2024/4/2/750_1712051414517.jpg",
    promoTitle: "Xem Phim Hay - Ngất Ngây Cùng Bánh Phồng Dế Rec Rec",
  },
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2024/4/15/galaxy-da-co-1800x1200_1713168778020.jpg",
    promoTitle: "ZaloPay Giảm Đến 50K Khi Mua Vé Galaxy Cinema",
  },
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2024/4/26/shopee-pay-3_1714114778568.jpg",
    promoTitle: "Voucher ShopeePay Giảm 20K Dành Tặng Các Stars!",
  },
  {
    promoImg: "https://cdn.galaxycine.vn/media/2024/4/16/750_1713257524954.jpg",
    promoTitle: "Happy Day - Vé Chỉ Từ 50K",
  },
  {
    promoImg:
      "https://cdn.galaxycine.vn/media/2022/11/1/combo-u22-digital-450x300_1667285240629.jpg",
    promoTitle: "U22 Vui Vẻ - Bắp Nước Siêu Hạt Dẻ",
  },
]
var footer_items = [
  {
    name: "giới thiệu",
    child: [
      {
        name: "về chúng tôi",
      },
      {
        name: "thỏa thuận sử dụng",
      },
      {
        name: "quy chế hoạt động",
      },
      {
        name: "chính sách bảo mật",
      },
    ],
  },
  {
    name: "góc điện ảnh",
    child: [
      {
        name: "Thể loại phim",
      },
      {
        name: "bình luận phim",
      },
      {
        name: "Blog điện ảnh",
      },
      {
        name: "phim hay tháng",
      },
      {
        name: "phim imax",
      },
    ],
  },
  {
    name: "hỗ trợ",
    child: [
      {
        name: "góp ý",
      },
      {
        name: "sale & services",
      },
      {
        name: "rạp / giá vé",
      },
      {
        name: "tuyển dụng",
      },
      {
        name: "FAQ",
      },
    ],
  },
]
app.get("/api/menus", (req, res) => {
  res.send(menus)
})
app.get("/api/movieCats", (req, res) => {
  res.send(movieCats)
})
app.get("/api/movies", (req, res) => {
  res.send(movies)
})
app.get("/api/blogType", (req, res) => {
  res.send(blogType)
})
app.get("/api/slideImg", (req, res) => {
  res.send(slideImg)
})
app.get("/api/blogContent", (req, res) => {
  res.send(blogContent)
})
app.get("/api/promoLists", (req, res) => {
  res.send(promoLists)
})
app.get("/api/footer_items", (req, res) => {
  res.send(footer_items)
})

app.all("*", (req, res, next) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"))
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" })
  } else {
    res.tyle("text", "404 Not Found")
  }
  next(err)
})

app.use(errorHandler)

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB")
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})

mongoose.connection.on("error", (err) => {
  console.log(err)
  logEvents(
    `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  )
})
