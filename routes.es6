import User from './lib/db/User'
import Assignment from './lib/db/Assignment'

module.exports = function (app, passport) {

    // route for home page
    app.get('/', function (req, res) {
        res.render('index'); // load the index.ejs file
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', {
            user: req.user // get the user out of session and pass to template
        });
    });

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


    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    app.get('/mix_users', isLoggedIn, function (req, res) {
        // update user data
        User.find().then(users => {
            let ids = users.map(user => user._id);
            let all = users.map(user => user._id);
            let pairs = [];
            ids.forEach(id => {
                let others = all.filter(otherId => otherId !== id);

                let index = Math.floor(Math.random() * others.length);
                let candidate = others[index];
                pairs.push({from: id, to: candidate});
                let start = all.indexOf(candidate);
                all.splice(start, 1);
            });
            new Assignment({pairs: pairs}).save((err, saved) => {
                if (err) {
                    console.log("Error occured", err);
                } else {
                    console.log("Saved assignment", saved);
                }
                res.redirect("/");
            });
        })
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
