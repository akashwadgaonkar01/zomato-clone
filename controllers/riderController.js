const asyncHandler = require("express-async-handler")
const Rider = require("../models/Rider")

exports.getRiderOrders = asyncHandler(async (req, res) => {
    const result = await Rider
        .find({ rider: req.user })
        .select("-rider -createdAt -updatedAt -__v")
        .populate("restaurant", "name hero")
        .populate("customer", "name email mobile")
        .populate("items.dish", "name type image price")
        .sort({ createdAt: -1 })
    res.json({ message: "order fetch success", result })
})