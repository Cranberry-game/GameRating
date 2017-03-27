import {router as userrouter} from './users';
import {router as gamerouter} from './game';
import {router as lgrouter} from './login';
/* GET home page. */
//const Sequelize = require ("sequelize");

export const router = (app) => {

	app.get("/",function (req,res,next){
		res.send("Hello! This is GameRating!");
	});

  let prefix='/api/v1';
  app.use(prefix+'/game',(req,res,next)=>{
    gamerouter.set('db',app.get('db'));
    next();
  },gamerouter);
  app.use(prefix+'/user',(req,res,next)=>{
    gamerouter.set('db',app.get('db'));
    next();
  },userrouter);
  app.use(prefix+'/login',(req,res,next)=>{
    lgrouter.set('db',app.get('db'));
    
    next();
  },lgrouter);
};
