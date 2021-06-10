const express = require('express');
const router = express.Router();

const User = require('../../models/userModel');

module.exports = router;

router.get('/', (req, res) => {
    if (req.body) {
        res.json(req.body);
    } else {
        res.status(200).json({
            message: 'auth google (post)'
        });
    }
});

router.post('/', (req, res) => {
    const setUserToGoogle = {
        userEmail: req.body.userEmail,
        userToken: req.body.authToken
    };
    User.findOne({email: setUserToGoogle.userEmail}).then(user => {
        if (!user) {
            res.json({
                type: false,
                data: null,
                message: 'Problem with email ? (unknown)'
            })
        }
        user.services.google.accessToken = setUserToGoogle.userToken;
        user.save();
        res.json({
            type: true,
            data: user
        });
    });
});
