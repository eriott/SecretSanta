// import User from '../lib/db/User'
//
// let express = require('express');
// let router = express.Router();
// let passport = require('passport');
//
// // /* GET home page. */N
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });
// //
// // // POST home page.
// // router.post('/', function (req, res, next) {
// //     let params = req.body;
// //     new User({token: "token", email: "email", registerDate: new Date(), fullName: params.fullName, address: params.address, wantedInfo: params.wanted, unwantedInfo: params.unwanted}).save((err, user) => {
// //         if (err) {
// //             console.log("Error occured", err)
// //         }
// //
// //         console.log("Saved user", user)
// //     })
// // });
//
//
// // app/routes.js
//
// // module.exports = function(app, passport) {
//
//     // route for home page
//     router.get('/', function(req, res) {
//         res.render('index.ejs'); // load the index.ejs file
//     });
//
//     // route for login form
//     // route for processing the login form
//     // route for signup form
//     // route for processing the signup form
//
//     // route for showing the profile page
//     router.get('/profile', isLoggedIn, function(req, res) {
//         res.render('profile.ejs', {
//             user : req.user // get the user out of session and pass to template
//         });
//     });
//
//     // route for logging out
//     router.get('/logout', function(req, res) {
//         req.logout();
//         res.redirect('/');
//     });
//
//     // facebook routes
//     // twitter routes
//
//     // =====================================
//     // GOOGLE ROUTES =======================
//     // =====================================
//     // send to google to do the authentication
//     // profile gets us their basic information including their name
//     // email gets their emails
//     router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
//     // the callback after google has authenticated the user
//     router.get('/auth/google/callback',
//         passport.authenticate('google', {
//             successRedirect : '/profile',
//             failureRedirect : '/'
//         }));
//
// // };
//
// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//
//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();
//
//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }
//
//
//
// module.exports = router;
//
