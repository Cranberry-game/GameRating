//var express = require('express');
//var router = express.Router();

/* GET home page. */
export const router = (app) => {
	app.route("/api")
		.get((req,res,next)=>{
			res.send("This is API!");
		});
	//app.use('/',router);
	app.get("/",function (req,res,next){
		res.send("Hello! This is GameRating!");
	});

};
