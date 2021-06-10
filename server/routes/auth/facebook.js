const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../../config/passport')(passport);

const User = require('../../models/userModel');


router.get('/', (req, res) => {
    if (req.body) {
        res.json(req.body);
    } else {
        res.status(200).json({
            message: 'auth facebook (post)'
        });
    }
});

router.post('/', (req, res) => {
    const setUserToFacebook = {
        userEmail: req.body.userEmail,
        userId: req.body.userId,
        userToken: req.body.authToken
    };
    User.findOne({email: setUserToFacebook.userEmail}).then(user => {
        if (!user) {
            res.json({
                type: false,
                data: null,
                message: 'Problem with email ? (unknown)'
            })
        }
        user.services.facebook.userId = setUserToFacebook.userId;
        user.services.facebook.accessToken = setUserToFacebook.userToken;
        user.save();
        res.json({
            type: true,
            data: user,
            message: 'Successfully connected to facebook'
        });
    });

    console.log(setUserToFacebook);
});

module.exports = router;
