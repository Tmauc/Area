const express = require('express');
const router = express.Router();
const oauth = require('oauth');

const _twitterConsumerKey = 'apAazANbPxQvoooGH9LoEbRh9';
const _twitterConsumerSecret = 'W8J00oFSI1ITTHJAtyApsiycFrwGNpRA36JRbQ9NCRnMRT08RW';
const twitterCallbackUrl = 'https://127.0.0.1:8081/services';
const consumer = new oauth.OAuth("https://twitter.com/oauth/request_token",
    "https://twitter.com/oauth/access_token",_twitterConsumerKey, _twitterConsumerSecret,
    "1.0A", twitterCallbackUrl, "HMAC-SHA1");

router.get('/connect', (req, res) => {
    consumer.getOAuthRequestToken(function (error, oauthToken,   oauthTokenSecret) {
        if (error) {
            res.status(500).send(error);
        } else {
            req.session.oauthRequestToken = oauthToken;
            req.session.oauthRequestTokenSecret = oauthTokenSecret;
            const redirect = {
                redirectUrl: `https://twitter.com/oauth/authorize?oauth_token=${req.session.oauthRequestToken}`
            };
            res.send(redirect);
        }
    });
});

router.get('/save', (req, res) => {
    consumer.getOAuthAccessToken(req.query.oauth_token, req.session.oauthRequestTokenSecret, req.query.oauth_verifier,
        (error, oauthAccessToken, oauthAccessTokenSecret) => {
            if (error) {
                res.status(500).send(error);
            } else {
                req.session.oauthAccessToken = oauthAccessToken;
                req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
                return res.json({
                    type: true,
                    message: 'token saved',
                    data: {
                        'accessToken': oauthAccessToken,
                        'accessTokenSecret': oauthAccessTokenSecret
                    }
                });
            }
        });
});

module.exports = router;
