import UserEventService from './lib/services/UserEventService'
import AssignAddressesService from './lib/services/AssignAddressesService'
import UserEvent from './lib/dto/UserEvent'

module.exports = function (app, passport) {
    // route for home page
    app.get('/', function (req, res) {
        res.render('index'); // load the index.ejs file
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        new UserEventService().getByUser(req.user).then(events => {
            res.render('profile', {
                user: req.user, // get the user out of session and pass to template
                events: events,
                target: {}
            });
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
                res.send(user);
            }
        })
    });

    app.post('/update_event', isLoggedIn, function (req, res) {
        let user = req.user;
        let params = req.body;

        new UserEventService().save(new UserEvent(Object.assign(params, {user: req.user})))
    });


    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    app.get('/mix_users', isLoggedIn, function (req, res) {
        new AssignAddressesService().assign()
            .then(() => res.redirect("/"))
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
