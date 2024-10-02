const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// admin routes
router.get('/dashboard', auth, adminController.getDashboard);
router.get('/users', auth, adminController.getUsers);
router.put('/users/:id', auth, adminController.updateUser);
router.delete('/users/:id', auth, adminController.deleteUser);

module.exports = router;