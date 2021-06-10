const express = require('express');
const router = express.Router();

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
                if (user.services.github == []) {
                    user.services.github = {}
                }
                console.log(req.body.data);
                user.services.github.username = req.body.data;
                user.save();
                res.json({
                    type: true,
                    data: user,
                    message: 'You set a new github username !'
                })
            }
        });
});

module.exports = router;
