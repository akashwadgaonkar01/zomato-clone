const { getLocation, updateCustomerInfo, getRestaurant, getRestaurantMenu, placeOrder, getOrders } = require("../controllers/customerController")
// const { updateInfo, deleteMenu, updateMenu, getMenu, addMenu } = require("../controllers/restaurantController")

const router = require("express").Router()

router
    .post("/get-location", getLocation)
    .post("/update-customer-info", updateCustomerInfo)
    .get("/get-restaurant", getRestaurant)
    .get("/get-restaurant-menu/:rid", getRestaurantMenu)
    .post("/place-order", placeOrder)
    .get("/get-orders", getOrders)

module.exports = router