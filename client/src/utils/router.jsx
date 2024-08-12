export const ROUTERS = {
    USER: {
        HOME: "",
        PROFILE: "UserDetails",
        PRODUCT: "/product",
        NOWSHOWING:"phim-dang-chieu",
        BOOKING: "booking/:id",
        UPCOMING: "phim-sap-chieu",
        IMAX: "phim-imax",

    
        
    },
    ADMIN: {
        MOVIE: "admin/movie",
        ADMIN: "admin",
        CINEMA:"admin/cinema",
        SHOWTIME: "admin/showtime",
        SHOWTIMECREATE: "admin/showtime/create",
        CINEMACREATE:"admin/cinema/create",
        MOVIECREATE: "admin/movie/create",
        MOVIEUPDATE: "admin/movie/update/:id",
        USER:"admin/user",
        USERCREATE:"admin/create",
        USERUPDATE: "admin/update/:id",
        DELETE: "admin/delete/:id",

    }
}