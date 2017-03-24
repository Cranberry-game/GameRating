"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
//var express = require('express');
//var router = express.Router();

/* GET home page. */
var router = exports.router = function router(app) {
	app.route("/api").get(function (req, res, next) {
		res.send("This is API!");
	});
	//app.use('/',router);
	app.get("/", function (req, res, next) {
		res.send("Hello! This is GameRating!");
	});
};