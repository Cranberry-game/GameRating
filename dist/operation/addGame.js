"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addGame = addGame;
/**
 * Created by WangYe on 3/24/17.
 */
var Game = require("../model/Game.js");

//Create a new game

var now = Date.now();

function addGame(game) {
    (async function () {
        var game = await Game.create({
            title: game.title,
            gameType: game.gameType,
            totalRate: game.totalRate,
            price: game.price,
            releaseCompany: game.releaseCompany,
            releaseDate: game.releaseDate,
            studio: game.studio,
            createdAt: now,
            updatedAt: now
        });
        console.log('created: ' + JSON.stringify(game));
    })();
}