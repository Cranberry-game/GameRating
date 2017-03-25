import {defg} from './model/Game';
import {defp} from './model/Platform';
import {defr} from './model/Review';
import {defu} from './model/User';
import {defgl} from './model/GameList';
import {defc} from './model/Creation';
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

let Game = defg(sequelize);
//Game.sync();

let User=defu(sequelize);
//User.sync();

let Platform = defp(sequelize);
Platform.belongsTo(Game);
//Platform.sync();

let GameList = defgl(sequelize);
GameList.belongsTo(User, {as: 'creator'});
//GameList.sync();

let Creation = defc(sequelize);
Game.belongsToMany(GameList, {as: 'game', through: Creation});
GameList.belongsToMany(Game, {as: 'gamelist', through: Creation} );
// Creation.sync();

let Review = defr(sequelize);
User.belongsToMany(Game, {as: 'User', through: Review});
Game.belongsToMany(User, {as: 'Game', through: Review});
// Review.sync();

let db = {
    Game: Game,
    GameList: GameList,
    Creation: Creation,
    Review: Review,
    Platform: Platform,
    User: User
};

let express = require('express');

let app = express();
app.set('db',db);
// app.set('User',User);
// app.set('Review',Review);
// app.set('Platform',Platform);

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

