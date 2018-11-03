import {Route, StaticRouter, Switch} from 'react-router';
import configureStore from "./client/redux/configureStore";
import ReactDom from 'react-dom/server';
import React from 'react';
import {Provider} from 'react-redux';
import App from "./components/App/App";
import Guest from "./components/GuestPage/Guest";
import Profile from "./components/ProfilePage/Profile";
import routes from './routes'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.use((req, res) => {
  // This context object contains the results of the render
  const context = {};
  const store = configureStore();

  let html = "";
  try {
    html = ReactDom.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
            {routes}
        </StaticRouter>
      </Provider>
    );
  } catch (err) {
    console.error(err)
  }


  if (context.url) {
    res.redirect(301, context.url);
  } else {
    return res.end(renderHTML(html, store.getState()));
  }
});

function renderHTML(componentHTML, initialState) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Gifts Exchange</title>
          <script type="application/javascript">
                window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css' integrity='sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb' crossOrigin='anonymous'/>
          <link rel='stylesheet' href='/styles.css'/>
          <script type="application/javascript" src='/javascripts/jquery-3.2.1.min.js'></script>
          <script type="application/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js' integrity='sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh' crossOrigin='anonymous'></script>
          <script type="application/javascript" src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js' integrity='sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ' crossOrigin='anonymous'></script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
}

// app.use((req, res) => {
//     const store = configureStore();
//
//     match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
//         if (redirectLocation) { // Если необходимо сделать redirect
//             return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
//         }
//
//         if (error) { // Произошла ошибка любого рода
//             return res.status(500).send(error.message);
//         }
//
//         if (!renderProps) { // мы не определили путь, который бы подошел для URL
//             return res.status(404).send('Not found');
//         }
//
//         const componentHTML = ReactDom.renderToString(
//             <Provider store={store}>
//                 <RouterContext {...renderProps} />
//             </Provider>
//         );
//
//         return res.end(renderHTML(componentHTML));
//     });
// });

//require('./lib/auth/passport')(passport); // pass passport for configuration
//require('./routes.jsx')(app, passport); // load our routes and pass in our app and fully configured passport
//
// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
