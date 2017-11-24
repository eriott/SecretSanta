import config from '../../config'
import User from '../db/models/User'
import UserRepository from '../db/UserRepository'

let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({

            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret,
            callbackURL: config.googleAuth.callbackURL,

        },
        function (token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                new UserRepository().getByGoogleId(profile.id).then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        new UserRepository().save({
                            google: {
                                id: profile.id,
                                token: token,
                                name: profile.displayName,
                                email: profile.emails[0].value
                            }
                        }).then(() => done(null, user))
                    }
                });
            });
        }));

};