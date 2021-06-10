const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Register (GET) works !'
    });
});