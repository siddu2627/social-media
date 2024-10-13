const Admins = require('../models/Admins');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName

const adminsRegister = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const adminsEmail = await Admins.findOne({ email });
        if (adminsEmail) {
            return res.status(400).json("Email already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmins = new Admins({
            username,
            email,
            password: hashedPassword
        });
        await newAdmins.save();

        res.status(201).json({ message: "Admin registered successfully" });
        console.log('registered')

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }

}

const adminsLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const admins = await Admins.findOne({ email });
        if (!admins || !(await bcrypt.compare(password, admins.password))) {
            return res.status(401).json({ error: "Invalid username or password" })
        }
        const token = jwt.sign({ adminsId: admins._id }, secretKey, { expiresIn: "1h" })

        const adminsId = admins._id;

        res.status(200).json({ success: "Login successful", token, adminsId })
        console.log(email, "this is token", token);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}

const getAllAdmins = async(req, res) => {
    try {
        const admins = await Admins.find().populate('user');
        res.json({ admins })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const getAdminsById = async(req, res) => {
    const adminsId = req.params.id;

    try {
        const admins = await Admins.findById(adminsId).populate('user');
        if (!admins) {
            return res.status(404).json({ error: "Vendor not found" })
        }
        const adminsUserId = admins.user[0]._id;
        res.status(200).json({ adminsId, adminsUserId, admins })
        console.log(adminsUserId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = { adminsRegister, adminsLogin, getAllAdmins, getAdminsById }