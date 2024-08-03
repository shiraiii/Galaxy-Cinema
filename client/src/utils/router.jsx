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
        CINEMACREATE:"admin/cinema/create",
        CINEMA:"admin/cinema",
        MOVIECREATE: "admin/movie/create",
        MOVIEUPDATE: "admin/movie/update/:id",
        USER:"admin/user",
        USERCREATE:"admin/create",
        USERUPDATE: "admin/update/:id",
        DELETE: "admin/delete/:id",

    }
}