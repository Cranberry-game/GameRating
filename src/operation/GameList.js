 let now = Date.now();
//
// //input example
// let gameList = {
//     userId: 1,
//     gameId: [1,2],
//     name: 'Best RPG',
//     description: "good game list",
//     totalRate: 2,
//     img: 'URL://',
// };
//

export const addGameList = (gameList,db)=>{
    return Promise.all([
        db.User.findById(gameList.userId),
        db.GameList.create({
            name: gameList.name,
            img: gameList.img,
            description: gameList.description,
            totalRate: gameList.totalRate,
            createdAt: now,
            updatedAt: now
        }),
    ]).then(function (value) {
        return (async()=>{
            let games = new Array(gameList.gameId.length);
            for (let i = 0; i < games.length; i++){
                games[i] = await db.Game.findById(gameList.gameId[i]);
            }
            await value[1].addGames(games);
            await value[0].addGamelist(value[1]);
            console.log("Create " + JSON.stringify(value[1]));
            return true;
        })();
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const queryGameListByName = (gameListName, db)=>{
    return db.GameList.findAll({
        limit: 10,
        where: {
            name : {
                $like: '%' + gameListName + '%'
            }
        }
    }).then(function (gl) {
        return (async() =>{
            let res = new Array(gl.length);
            for (let i = 0; i < gl.length; i++){
                let user = await gl[i].getUser();
                res[i] = {
                    id: gl[i].id,
                    gameListName: gl[i].name,
                    creator: user.name,
                    createTime: gl[i].createdAt,
                    updateTime: gl[i].updatedAt
                };
            }
            console.log(JSON.stringify(res));
            return res;
        })();
    }).catch(function (err) {
        console.log(err.name);
        return false;
    });
};

export const queryGameListById = (gameListId, db)=>{
    return db.GameList.findById(gameListId).then(function (gl) {
        return (async()=>{
            let games = await gl.getGames();
            let g = new Array(games.length);
            for (let i = 0; i < games.length; i++){
                g[i] = {
                    id: games[i].id,
                    cover: games[i].cover,
                    title: games[i].title,
                    rate: games[i].totalRate
                }
            }
            let user = await gl.getUser();
            let res = {
                id: gl.id,
                gameListName: gl.name,
                creator: user.name,
                createTime: gl.createdAt,
                updateTime: gl.updatedAt,
                games: g
            };
            console.log(JSON.stringify(res));
            return res;
        })();
    }).catch(function (err) {
        console.log(err.name);
        return false;
    });
};

export const deleteGameList = (gameListId, db) =>{
    return db.GameList.destroy({
        where:{
            id : gameListId,
        }
    }).then(function (gl) {
        console.log("delete " + gl + " game lists");
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const addGameToGameList = (gameId, gameListId, db)=>{
    let gl;
    return db.GameList.findById(gameListId).then(function (gameList) {
        gl = gameList;
        return db.Game.findById(gameId)
    }).then(function (g) {
        gl.addGame(g);
    }).then(function () {
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const removeGameInGameList = (gameId, gameListId, db)=>{
    let gl;
    return db.GameList.findById(gameListId).then(function (gameList) {
        gl = gameList;
        return db.Game.findById(gameId)
    }).then(function (g) {
        gl.removeGame(g);
    }).then(function () {
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};