const FacebookStrategy = require('passport-facebook').Strategy;
const facebookAuth = require('./facebookkey');

module.exports = function(passport) {
    passport.use(new FacebookStrategy({
        clientID : facebookAuth.facebookAuth.clientID,
        clientSecret : facebookAuth.facebookAuth.clientSecret,
        callbackURL : facebookAuth.facebookAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
           return done(null, profile);
        });
    }));
};
