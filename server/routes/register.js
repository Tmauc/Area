const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Mongoose
const User = require('../models/userModel');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Register (GET) works !'
    });
});

router.post('/', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                res.json({
                    type: false,
                    data: null,
                    message: 'Email already exists !'
                })
            } else {
                let newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    photoUrl: '',
                    services: {
                        facebook: {
                            accessToken: '',
                            userId: ''
                        }
                    }
                });
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(res.json({
                                type: true,
                                data: newUser,
                                message: 'You can log in :)'
                            }));
                    }));
            }
        });
});

module.exports = router;
