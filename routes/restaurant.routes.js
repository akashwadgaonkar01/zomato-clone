const { updateInfo, deleteMenu, updateMenu, getMenu, addMenu, getRestaurantOrders, updateRestaurantStatus, } = require("../controllers/restaurantController")

const router = require("express").Router()

router
    .post("/update-info", updateInfo)

    .post("/add-menu", addMenu)
    .get("/fetch-menu", getMenu)
    .put("/update-menu/:menuId", updateMenu)
    .delete("/delete-menu/:menuId", deleteMenu)

    .get("/get-restaurant-orders", getRestaurantOrders)
    .put("/change-status/:oid", updateRestaurantStatus)

module.exports = router