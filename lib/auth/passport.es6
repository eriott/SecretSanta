import config from '../../config'
import User from '../db/models/User'
import UserRepository from '../db/UserRepository'
import Event from '../db/models/Event'

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
            const CODEGIRLS_EVENT = 'codegirls17';

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                new UserRepository().getByGoogleId(profile.id).then(user => {
                    if (user) {
                        console.info(`User ${user.google.email}(${user._id}) logged in`);
                        return done(null, user);
                    } else {
                        console.info(`Registering new User ${profile.emails[0].value}...`);

                        new UserRepository().save({
                            google: {
                                id: profile.id,
                                token: token,
                                name: profile.displayName,
                                email: profile.emails[0].value
                            }
                        }).then(saved => {
                            console.info(`User ${saved.google.email} registered.`);

                            return Event.findOne({uid: CODEGIRLS_EVENT}).then(event => {
                                if (event) {
                                    console.info(`Add User ${saved.google.email} to Event "${event.uid}".`);
                                    event.members.push(saved);
                                    return event.save().then(() => done(null, saved))
                                } else {
                                    return Promise.resolve().then(() => done(null, saved))
                                }
                            })
                        })
                    }
                }).catch(err => {
                    console.error(err)
                })
            });
        }));

};