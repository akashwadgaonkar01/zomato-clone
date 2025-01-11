const { getLocation, updateCustomerInfo } = require("../controllers/customerController")
const { updateInfo, deleteMenu, updateMenu, getMenu, addMenu } = require("../controllers/restaurantController")

const router = require("express").Router()

router
    .post("/get-location", getLocation)
    .post("/update-customer-info", updateCustomerInfo)

module.exports = router