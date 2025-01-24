const { registerAdmin, loginAdmin, logoutAdmin, verifyAdminOTP, loginRestaurant, logoutRestaurant, registerRestaurant, registerCustomer, loginCustomer, verifyCustomerOTP, logoutCustomer, loginRider, logoutRider } = require("../controllers/auth.controller")

const router = require("express").Router()

router
    .post("/register-admin", registerAdmin)
    .post("/login-admin", loginAdmin)
    .post("/verify-admin-otp", verifyAdminOTP)
    .post("/logout-admin", logoutAdmin)

    .post("/register-customer", registerCustomer)
    .post("/login-customer", loginCustomer)
    .post("/verify-customer-otp", verifyCustomerOTP)
    .post("/logout-customer", logoutCustomer)

    .post("/register-restaurant", registerRestaurant)
    .post("/login-restaurant", loginRestaurant)
    .post("/logout-restaurant", logoutRestaurant)

    .post("/login-rider", loginRider)
    .post("/logout-rider", logoutRider)

module.exports = router