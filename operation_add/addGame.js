/**
 * Created by WangYe on 3/24/17.
 */
const Game = require ("../modle/Game.js");

//Create a new game

let now = Date.now();

export function addGame(game){
    (async () => {
        let game = await Game.create({
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
