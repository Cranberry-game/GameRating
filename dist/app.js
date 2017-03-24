"use strict";

var _Game = require("./model/Game");

var Sequelize = require("sequelize");
var config = require("./config.js");

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var now = Date.now();
//import {defgl} from './model/GameList';
//let GameList = defgl(sequelize);

var Game = (0, _Game.defg)(sequelize);
//Game.sync();

//import {addGame} from './operation/Game';
// addGame({
//             title: "Super Mario",
//             gameType: "Run",
//             totalRate: 5,
//             price: "$10",
//             releaseCompany: "N",
//             releaseDate: "2017",
//             studio: "default",
// },Game);
// import {defp} from './model/Platform';
// let Platform = defp(sequelize);

// import {defr} from './model/Review';
// let Review = defr(sequelize);

// import {deru} from './model/User';
// let User=deru(sequelize);
//
//import {queryGameById} from './operation/Game';
//queryGameById(1,Game);

//add the game platform
// (async () => {
//     let platform = await Platform.create({
//         gameId: 1,
//         platformName: "PS4",
//         createdAt: now,
//         updatedAt: now
//     });
//     console.log('created: ' + JSON.stringify(platform));
// })();

//create a new user
// (async () => {
//     let user = await User.create({
//         email: "sss@ggg.com",
//         name: "Wang",
//         password: "123321",
//         isAdmin: false,
//         isVerified: false,
//         avatar: "https://pbs.twimg.com/media/Cn4klgrXEAA7OZC.jpg",
//         age: 23,
//         address: "Boston",
//         phone: "1233332213",
//         createdAt: now,
//         updatedAt: now
//     });
//     console.log('created: ' + JSON.stringify(user));
// })();

// //create a new review
// (async () => {
//     let review = await Review.create({
//         id: 1,
//         userId: 1,
//         gameId: 1,
//         rate: 2.9,
//         content: "balabala",
//         createdAt: now,
//         updatedAt: now
//     });
//     console.log('created: ' + JSON.stringify(review));
// })();

//create gamelist

// (async () => {
//     let gameList = await GameList.create({
//         id: 1,
//         name: "Best RPG",
//         img: "https://pbs.twimg.com/media/Cn4klgrXEAA7OZC.jpg",
//         creatorId: 1,
//         gameId: 1,
//         createdAt: now,
//         updatedAt: now
//     });
//     console.log('created: ' + JSON.stringify(gameList));
// })();

//search a review
// (async () => {
//     let review = await Review.findAll({
//         where: {
//             reviews: 1
//         }
//     });
//     console.log(`find ${review.length} review:`);
//     for (let p of review) {
//         console.log(JSON.stringify(p));
//     }
// })();


var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

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