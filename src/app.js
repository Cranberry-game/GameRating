import {defg} from './model/Game';
import {defp} from './model/Platform';
import {defr} from './model/Review';
import {defu} from './model/User';
const Sequelize = require ("sequelize");
const config  = require ("./config.js");


let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let now = Date.now();
//import {defgl} from './model/GameList';
//let GameList = defgl(sequelize);
// let db ={
//   Game:degf(sequelize)
// };

let Game = defg(sequelize);
let Platform = defp(sequelize);
let Review = defr(sequelize);
let User=defu(sequelize);
let express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');

let app = express();
app.set('Game',Game);
app.set('User',User);
app.set('Reivew',Review);
app.set('Platform',Platform);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
   //var err = new Error('Not Found');
   //err.status = 404;
   //next(err);
 //});

// // error handler
 //app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   //res.locals.message = err.message;
   ///res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
   //res.status(err.status || 500);
   //res.render('error');
 //});




module.exports = app;

