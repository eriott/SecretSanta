module.exports = function (app, passport) {

    // route for home page
    app.get('/', function (req, res) {
        res.render('index'); // load the index.ejs file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // app.post('/profile', isLoggedIn, function (req, res) {
        // update user data
        // let user = req.user;
        // let params = req.body;
        // user.postData.fullName = params.fullName;
        // user.postData.address = params.address;
        // user.about = params.about;
        //
        // user.save((err, user) => {
        //     if (err) {
        //         console.log("Error occured", err)
        //     } else {
        //         console.log("User saved", user)
        //     }
        // })
    // });

    app.post('/update_profile', isLoggedIn, function (req, res) {
        // update user data
        let user = req.user;
        let params = req.body;
        user.postData.fullName = params.fullName;
        user.postData.address = params.address;
        user.about = params.about;

        user.save((err, user) => {
            if (err) {
                console.log("Error occured", err)
            } else {
                console.log("User saved", user);
                req.user = user;
                res.send("Saved");
            }
        })
    });

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
