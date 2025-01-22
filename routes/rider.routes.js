const { getRiderOrders } = require("../controllers/riderController")

const router = require("express").Router()

router
    .get("/get-orders", getRiderOrders)

module.exports = router