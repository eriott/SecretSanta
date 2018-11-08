import {StaticRouter} from 'react-router';
import configureStore from "./client/redux/configureStore";
import ReactDom from 'react-dom/server';
import React from 'react';
import {Provider} from 'react-redux';
import routes from './routes'
import User from './lib/db/models/User';
import GoogleJWTVerifier from "./lib/services/auth/GoogleJWTVerifier";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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
app.use(cookieParser('FfgjkdgRFdsfadfI$'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret

app.post('/auth/google', async (req, res) => {
  try {
    const payload = await new GoogleJWTVerifier().verify(req.body.idToken);
    const userId = payload['sub'];
    setCookie(res, {token: 'google token'});
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

app.post('/exchanges', authMiddleware(), (req, res) => {
  res.send(req.body);
  // let exchange = new UserEvent(Object.assign({}, req.body, {user: req.user}));
  // new UserEventService().save(exchange)
  //   .then(saved => res.send(saved))
  //   .catch(err => res.sendStatus(500));
});

app.use((req, res) => {
  const cookies = req.signedCookies;
  console.debug('SERVER SIGNED COOKIES', cookies);
  const token = cookies && cookies['auth-token'] ? cookies['auth-token'] : undefined;
  const initialState = token ? {auth: {token: token}} : {};
  console.debug('SERVER INITIAL STATE', initialState);

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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/css/bootstrap-datepicker.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
          <link rel='stylesheet' href='/styles.css'/>
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/js/bootstrap-datepicker.js"></script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
  `;
}

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

const TOKEN_COOKIE = 'auth-token';

function authMiddleware() {
  console.log('authMiddleware');
  return function (req, res, next) {
    let token = req.get('Authorization');
    console.log('TOKEN', token);
    if (!Boolean(token)) {
      res.sendStatus(401);
    } else {
      User.findOne({'google.token': token}).then(user => {
        if (Boolean(user)) {
          setCookie(res, {token: token});
          req.user = user;
          next();
        } else {
          res.clearCookie(TOKEN_COOKIE);
          res.sendStatus(403);
        }
      });
    }
  }
}

function setCookie(res, data) {
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  let date = new Date();
  date.setTime(date.getTime() + WEEK);
  res.cookie(TOKEN_COOKIE, data.token, {expires: date, secure: true, httpOnly: true, signed: true});
}

module.exports = app;
