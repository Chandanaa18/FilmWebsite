const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// register
exports.registerUser = async (req, res) => {
    const { accountType, fullname, email, phone, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            accountType,
            fullname,
            email,
            phone,
            username,
            password,
            isAdmin: false // make sure new user is not admin
        });

        // encrypt pw
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id
            }
        };
        console.log('Generating token with payload:', payload);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('Generated token:', token);
            res.status(201).json({ token, message: 'User registered successfully' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        console.log('Generating token with payload:', payload);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('Generated token:', token);
            res.status(200).json({ token, message: 'User logged in successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// get profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// In your controller (e.g., controllers/projectsController.js)
const getFilteredProjects = (req, res) => {
    const { budget, genre, duration } = req.query;

    // Build the query for the database based on filters
    let query = {};
    
    if (budget) {
        if (budget === 'low') query.budget = { $lt: 10000 };
        if (budget === 'medium') query.budget = { $gte: 10000, $lte: 50000 };
        if (budget === 'high') query.budget = { $gt: 50000 };
    }

    if (genre) query.genre = genre;
    if (duration) query.duration = duration;

    // Assuming you're using a database like MongoDB
    Project.find(query)
        .then(projects => res.json(projects))
        .catch(err => res.status(500).json({ error: 'Error fetching projects' }));
};

// In your routes (e.g., routes/projects.js)
router.get('/projects', getFilteredProjects);


// In your controller (Node.js backend)
app.post('/add-listing', (req, res) => {
    const newListing = {
        name: req.body.name,
        description: req.body.description,
        budget: req.body.budget,
        genre: req.body.genre,
        product: req.body.product
    };

    // Save newListing to the database
    // After saving, redirect the user back to the profile page
    res.redirect('/filmmaker_profile.html');
});


 
  
  