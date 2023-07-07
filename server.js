var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
const appRoot = require('app-root-path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(appRoot + '/public'));


// allow crose origin
app.use(cors());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'team4',
    resave: false,
    saveUninitialized: true
}));

var router = require('./router/main')(app, fs);