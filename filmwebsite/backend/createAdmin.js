const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config(); //environmental variable
const User = require('./models/userModel');
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log('MongoDB connected...');

        // check if admin has existed
        const adminExists = await User.findOne({ isAdmin: true });
        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // create admin
        const newAdmin = new User({
            username: 'FilmUnite Admin Primary', // change to the name you want
            email: 'filmunite@gmail.com', // change to the email you want
            password: 'zxcvb12345', // change to the pw you want
            isAdmin: true
        });

        // encrpyt
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(newAdmin.password, salt);

        await newAdmin.save();
        console.log('Admin user created');

        mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();
