const { getAdminCustomer, getAdminOrder, getAdminRestaurant, riderRegister, getAdminRider, registerAdminRider, updateAdminRider, updateRiderAccount, loginRider, logoutRider } = require("../controllers/admin.controller")

const router = require("express").Router()

router
    .get("/get-restaurant", getAdminRestaurant)
    .get("/get-customer", getAdminCustomer)
    .get("/get-order", getAdminOrder)
    .get("/get-rider", getAdminRider)

    // .post("/signup-rider", riderRegister)
    .post("/signin-rider", loginRider)
    .post("/signout-rider", logoutRider)

    .post("/register-rider", registerAdminRider)
    .get("/get-rider", getAdminRider)
    .put("/update-rider/:rid", updateAdminRider)
    .put("/update-rider-account/:rid", updateRiderAccount)

module.exports = router