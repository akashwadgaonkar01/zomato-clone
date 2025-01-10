const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },

    otp: { type: String },
    otpSendOn: { type: Date },
    password: { type: String },
    address: { type: String },
    city: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    isActive: { type: Boolean, default: false },
    infoComplete: { type: Boolean, default: false },

}, { timestamps: true })

module.exports = mongoose.model("customer", customerSchema)