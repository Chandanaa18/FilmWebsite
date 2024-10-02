const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        console.log('Verifying token:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Token is valid, decoded payload:', decoded);
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
