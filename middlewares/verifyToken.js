const Admins = require('../models/Admins');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhatIsYourName


const verifyToken = async(req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const admins = await Admins.findById(decoded.adminsId);

        if (!admins) {
            return res.status(404).json({ error: "admin not found" })
        }

        req.adminsId = admins._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }

}

module.exports = verifyToken