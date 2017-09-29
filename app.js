var crypto = require('crypto'),
    Restaurant = require('./models/restaurant');
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var index = require('./routes/index');
var restaurant = require('./routes/restaurant');
var hello = require('./routes/hello');
var settings = require('./settings');
var flash = require('connect-flash');

//var db = require('./models/db.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//var MongoStore = require('connect-mongo/es5')(session);
//var sessionStore = new MongoStore({
//    host: '10.120.27.23',
//    port: '27017',
//    db: 'session',
//    url: 'mongodb://10.120.27.23:27017'
//});


var app = express();

// view engine setup
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

//app.use(express.favicon());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(express.methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port,
        url: 'mongodb://10.120.27.23:27017'
    })
}));

app.use('/', index);
app.use('/restaurant', restaurant);

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



//app.get('/restaurant', restaurant.name);
app.get('/hello', hello.index);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//$(document).ready(function () {
//    initSubmitForm();
//});
var initSubmitForm = function () {
    // 使用 ajax() 來呼叫 REST API
    $.ajax({
        url: 'http://localhost:3000',
        type: "GET",
        dataType: "json",
        complete: function (data, textStatus, jqXHR) {
            console.log(textStatus);
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
        }
    });

    return false;
};
var dataMapping = function (data) {
    for (i = 0; i < data.length; i++) {
        var htmlCode =
            "<div class=\"alert alert-dismissable alert-info\">" + "     <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>" + "     <h4>jollen</h4>" + data[i].message + "</div>";

        $('#message').append(htmlCode);
    }
}

module.exports = app;