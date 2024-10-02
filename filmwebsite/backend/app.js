const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const auth = require('./middlewares/authMiddleware'); // 
require('dotenv').config();
const app = express();

// connect db
connectDB();

// interme
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static
app.use(express.static(__dirname + '/../')); //
app.use(express.static(path.join(__dirname, '../profile_section')));

/*// INITIALIZE MIDDLE COMPONENT
app.use(express.json({ extended: false }));*/

/* // GET ALL USERS route
app.use('/api/users', require('./routes/userRoutes'));*/

//home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html'); // path
});


// common route
app.use('/api/users', require('./routes/userRoutes'));

// admin route
app.use('/api/admin', require('./routes/adminRoutes'));

// protected routes
app.get('/api/protected', auth, (req, res) => {
    res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
