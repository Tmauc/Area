const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Mongoose
const User = require('../models/userModel');

router.post('/', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                res.json({
                    type: false,
                    data: null,
                    message: 'Not authentificated!'
                })
            } else {
                user.addWidget(req.body.action, req.body.reaction, req.body.data)
                res.json({
                    type: true,
                    data: null,
                    message: 'Widget added!'
                })
            }
        });
});

module.exports = router;
