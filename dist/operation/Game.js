'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by WangYe on 3/24/17.
 */
//Create a new game

var now = Date.now();

var addGame = exports.addGame = function addGame(game, Game) {
    (async function () {
        var gamet = await Game.create({
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
        console.log('created: ' + JSON.stringify(gamet));
    })();
};

var deleteGame = exports.deleteGame = function deleteGame(game, Game) {};

var updateGame = exports.updateGame = function updateGame(game, Game) {};

var queryGameById = exports.queryGameById = function queryGameById(id, Game) {
    //search a game
    (async function () {
        var game = await Game.findAll({
            where: {
                id: id
            }
        });
        console.log('find ' + game.length + ' game:');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = game[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var p = _step.value;

                console.log(JSON.stringify(p));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    })();
};