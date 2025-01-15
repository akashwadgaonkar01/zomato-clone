const { getLocation, updateCustomerInfo, getResturant } = require("../controllers/customerController")
const { updateInfo, deleteMenu, updateMenu, getMenu, addMenu } = require("../controllers/restaurantController")

const router = require("express").Router()

router
    .post("/get-location", getLocation)
    .post("/update-customer-info", updateCustomerInfo)
    .get("/get-restuarant", getResturant)

module.exports = router