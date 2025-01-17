const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Types.ObjectId, ref: "customer", required: true },
    restaurant: { type: mongoose.Types.ObjectId, ref: "restaurant", required: true },
    rider: { type: mongoose.Types.ObjectId, ref: "rider" },
    items: [{
        dish: { type: mongoose.Types.ObjectId, ref: "menu", required: true },
        qty: { type: Number, required: true }
    }],
    status: { type: String, default: "placed", enum: ["placed", "cooking", "packing", "out", "delivered"] }
}, { timestamps: true })

module.exports = mongoose.model("order", orderSchema)