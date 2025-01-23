const { getRiderOrders, updateOrderStatus } = require("../controllers/riderController")

const router = require("express").Router()

router
    .get("/get-orders", getRiderOrders)
    .put("/update-order-status/:oid", updateOrderStatus)

module.exports = router