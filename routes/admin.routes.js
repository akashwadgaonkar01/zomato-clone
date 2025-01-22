const { getAdminCustomer, getAdminOrder, getAdminRestaurant, riderRegister, getAdminRider, registerAdminRider, updateAdminRider, updateRiderAccount, loginRider, logoutRider, getAdminActiveRider } = require("../controllers/admin.controller")

const router = require("express").Router()

router
    .get("/get-restaurant", getAdminRestaurant)
    .get("/get-customer", getAdminCustomer)
    .get("/get-order", getAdminOrder)

    .post("/register-rider", registerAdminRider)
    .get("/get-rider", getAdminRider)
    .get("/get-active-rider", getAdminActiveRider)
    .put("/update-rider/:rid", updateAdminRider)
    .put("/update-rider-account/:rid", updateRiderAccount)

module.exports = router