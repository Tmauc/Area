const express = require('express');
const router = express.Router();

//Mongoose
const User = require('../models/userModel');

router.post('/', (req, res) => {
    console.log(req.body.email)
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                res.json({
                    type: false,
                    data: null,
                    message: 'Wrong email!'
                })
            } else {
                res.json({
                    type: true,
                    user: user
                })
            }
        });
});

module.exports = router;
