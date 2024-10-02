const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// register route
router.post('/register', registerUser);

// login route
router.post('/login', loginUser);

// get profile
router.get('/profile', auth, getUserProfile);

/*// GET ALL USERS
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});*/

//only admin can create new admin account
router.post('/create-admin', auth, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newAdmin = new User({
            username,
            email,
            password,
            isAdmin: true
        });

        // encrpt
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(password, salt);

        await newAdmin.save();
        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;
