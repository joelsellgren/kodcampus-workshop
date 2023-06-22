require('dotenv').config();
require('./config/mongoose');
require('./config/sequelize');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const { passport, setUser } = require('./utils/passport');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
    'hbs',
    exphbs.engine({
        defaultLayout: 'main',
        extname: '.hbs', // default ".handlebars"
    })
);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(setUser);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.flash = (type, message) => {
        req.session.flash = { type, message };
    };

    if (req.session.flash) {
        res.locals.flash = req.session.flash;
        delete req.session.flash;
    }

    next();
});

app.use('/', require('./routes/web/homeWebRouter'));
app.use('/login', require('./routes/web/loginWebRouter'));
app.use('/profile', require('./routes/web/profileWebRouter'));
app.use('/api/profile', require('./routes/api/profileApiRouter'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
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
