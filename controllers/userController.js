const User = require("../models/User");
const multer = require("multer");
const Admins = require('../models/Admins')
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addUserHandle = async(req, res) => {
    try {
        const { userName, socialMedia } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const adminsId = req.params.adminsId;
        const admins = await Admins.findById(adminsId);

        if (!admins) {
            return res.status(404).json({ error: "No firm found" });
        }

        const user = new User({
            userName,
            socialMedia,
            image,
            admins: admins._id
        })

        const savedUser = await user.save();
        admins.users.push(savedUser);


        await admins.save()

        res.status(200).json(savedUser)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const getUserByAdmins = async(req, res) => {
    try {
        const adminsId = req.params.adminsId;
        const admins = await Admins.findById(adminsId);

        if (!admins) {
            return res.status(404).json({ error: "No firm found" });
        }

        const adminsName = admins.userame;
        const user = await User.find({ admins: adminsId });

        res.status(200).json({ adminsName, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteUserById = async(req, res) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "No product found" })
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { addUserHandle: [upload.single('image'), addUserHandle], getUserByAdmins, deleteUserById };