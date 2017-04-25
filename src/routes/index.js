import {router as userrouter} from './users';
import {router as gamerouter} from './game';
import {router as lgrouter} from './login';
import {router as rvrouter} from './review';
import {router as glrouter} from './gamelist';
import {router as uprouter} from './upload';
import {router as lrvrouter} from './listreview';
import {router as srouter} from './search';
/* GET home page. */
//const Sequelize = require ("sequelize");

export const router = (app) => {

	app.get("/",function (req,res,next){
		res.send("Hello! This is GameRating!");
	});

  let prefix='/api/v1';
  app.use(prefix+'/game',(req,res,next)=>{
    gamerouter.set('db',app.get('db'));
    gamerouter.set('cl',app.get('cl'));
    gamerouter.set('ggcl',app.get('ggcl'));
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
  app.use(prefix+'/review',(req,res,next)=>{
    rvrouter.set('db',app.get('db'));
    next();

  },rvrouter);
  app.use(prefix+'/gamelist',(req,res,next)=>{
    glrouter.set('db',app.get('db'));
    glrouter.set('cl',app.get('cl'));
    glrouter.set('ggcl',app.get('ggcl'));
    next();


  },glrouter);
  app.use(prefix+'/upload',(req,res,next)=>{
    uprouter.set('db',app.get('db'));
    uprouter.set('dir',app.get('dir'));
    next();


  },uprouter);
  app.use(prefix+'/glreview',(req,res,next)=>{
    lrvrouter.set('db',app.get('db'));
    next();

  },lrvrouter);

  app.use(prefix+'/search',(req,res,next)=>{
    srouter.set('db',app.get('db'));
    srouter.set('cl',app.get('cl'));
    srouter.set('ggcl',app.get('ggcl'));
    next();
  },srouter);


};
