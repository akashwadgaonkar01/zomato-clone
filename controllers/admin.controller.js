const asyncHandler = require("express-async-handler")
const Restaurant = require("../models/Restaurant")
const Customer = require("../models/Customer")
const Order = require("../models/Order")
const Rider = require("../models/Rider")
const { sendEmail } = require("../utils/email")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkEmpty } = require("../utils/checkEmpty")
const { riderUpload } = require("../utils/upload")
const cloud = require("../utils/cloudinary")

exports.getAdminRestaurant = asyncHandler(async (req, res) => {
    const { limit, skip } = req.query
    const total = await Restaurant.countDocuments()
    const result = await Restaurant
        .find(req.body)
        .select("-password -createdAt -updatedAt -__v")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
    res.json({
        message: "restaurant fetch success", result: {
            restaurants: result,
            total: total,
        }
    })
})

exports.getAdminCustomer = asyncHandler(async (req, res) => {
    const { limit, skip } = req.query
    const total = await Customer.countDocuments()
    const result = await Customer
        .find(req.body)
        .select("-otp -createdAt -updatedAt -__v -otpSendOn")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
    res.json({
        message: "customer fetch success", result: {
            customers: result,
            total: total,
        }
    })
})

exports.getAdminRider = asyncHandler(async (req, res) => {
    const { limit, skip } = req.query
    const total = await Rider.countDocuments()
    const result = await Rider
        .find(req.body)
        .select(" -createdAt -updatedAt -__v")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
    res.json({
        message: "rider fetch success", result: {
            riders: result,
            total: total,
        }
    })
})

exports.getAdminOrder = asyncHandler(async (req, res) => {
    const { limit, skip } = req.query
    const total = await Order.countDocuments()
    const result = await Order
        .find(req.body)
        .select(" -createdAt -updatedAt -__v")
        .populate("restaurant", "name email mobile")
        .populate("customer", "name email mobile")
        .populate("items.dish", "name type price")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
    res.json({
        message: "order fetch success", result: {
            orders: result,
            total: total,
        }
    })
})

exports.registerAdminRider = asyncHandler(async (req, res) => {
    riderUpload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "multer error" })
        }
        const { name, email, mobile, address, city, gender, dob, profile } = req.body
        const { isError, error } = checkEmpty({ name, email, mobile, address, city, gender, dob, profile })
        if (isError) {
            return res.status(400).json({ message: "all fileds required", error })
        }
        const result = await Rider.findOne({ email })
        if (result) {
            return res.status(409).json({ message: "email already registered" })
        }
        const password = name.slice(0, 2) + email.slice(0, 2)
        const hash = await bcrypt.hash(password, 10)
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "image is require" })
        }
        const image = {}
        for (const key in req.files) {
            const { secure_url } = await cloud.uploader.upload(req.files[key][0].path)
            image[key] = secure_url
        }
        await Rider.create({ ...req.body, ...image, password: hash })
        await sendEmail({
            message: `<h1>your password is ${password}</h1>`,
            subject: "verify password to login",
            to: email
        })
        res.json({ message: "rider register success" })
    })
})

exports.loginRider = asyncHandler(async (req, res) => {
    // step 1 verify email
    const { email, password } = req.body;
    const result = await Rider.findOne({ email });
    if (!result) {
        res.status(401).json({ message: "email not found" });
    }
    // step 2 verify password
    const verify = await bcrypt.compare(password, result.password);
    if (!verify) {
        res.status(401).json({ message: "password do not match" });
    }
    // step 3 create token and send cookie
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, {
        expiresIn: "365d",
    });
    res.cookie("zomato-rider", token, {
        maxage: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod" ? true : false, // keeps false for local and true for
    });
    res.json({ message: "rider login success", result });
});

exports.logoutRider = asyncHandler(async (req, res) => {
    res.clearCookie("zomato-rider");
    res.json({ message: "rider logout success" });
});

exports.getAdminRider = asyncHandler(async (req, res) => {
    const { limit, skip } = req.query
    const total = await Rider.countDocuments()
    const result = await Rider
        .find()
        .select("-password -createdAt -updatedAt -__v")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
    res.json({
        message: "rider fetch success", result: {
            rider: result,
            total
        }
    })
})

exports.updateAdminRider = asyncHandler(async (req, res) => {
    riderUpload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "unable to upload file" })
        }

        if (req.file) {
            const licenceImage = {}
            if (req.file && req.file.fieldname === 'licence') {
                const result = await Rider.findById(req.params.rid);
                if (result.licence) {
                    await cloud.uploader.destroy(path.basename(result.licence, path.extname(result.licence)));
                    const { secure_url } = await cloud.uploader.upload(req.file.path);
                    licenceImage[key] = secure_url
                }
            }

            const rcImage = {}
            if (req.file && req.file.fieldname === 'rc') {
                const result = await Rider.findById(req.params.rid);
                if (result.rc) {
                    await cloud.uploader.destroy(path.basename(result.rc, path.extname(result.rc)));
                    const { secure_url } = await cloud.uploader.upload(req.file.path);
                    rcImage[key] = secure_url
                }
            }
            const updateData = {
                ...req.body,
                licence: licenceImage ? licenceImage : req.body.licence,
                rc: rcImage ? rcImage : req.body.rc
            }
            await Rider.findByIdAndUpdate(req.params.rid, updateData)
            res.json({ message: "rider update success" })
        } else {
            await Rider.findByIdAndUpdate(req.params.rid, { ...req.body })
            res.json({ message: "rider update success" })
        }
    })
})

exports.updateRiderAccount = asyncHandler(async (req, res) => {
    const { rid } = req.params
    await Rider.findByIdAndUpdate(rid, { isActive: req.body.isActive })
    res.json({ message: "rider account update success" })
})