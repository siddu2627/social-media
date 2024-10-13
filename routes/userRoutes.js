const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/add-user/:adminsId', userController.addUserHandle);
router.get('/:adminsId/user', userController.getUserByAdmins);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:userId', userController.deleteUserById);

module.exports = router;
