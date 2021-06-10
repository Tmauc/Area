const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Mongoose
const User = require('../models/userModel');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Login (GET) works !'
    });
});

router.post('/', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                res.json({
                    type: false,
                    data: null,
                    message: 'Wrong e-mail !'
                })
            } else {
                //Find if password is good
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if (isMatch) {
                        res.json({
                            type: true,
                            data: user,
                            message: 'Welcome on Area !'
                        })
                    } else {
                        res.json({
                            type: false,
                            data: null,
                            message: 'Wrong password !'
                        })
                    }
                })
            }
        });
});

module.exports = router;
