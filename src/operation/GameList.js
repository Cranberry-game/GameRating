 let now = Date.now();
//
// //input example
// let gameList = {
//     userId: 1,
//     gameId: [1,2],
//     name: 'Best RPG',
//     img: 'URL://',
// };
//

export const addGameList = (gameList,db)=>{
    return Promise.all([
        db.User.findById(gameList.userId),
        db.GameList.create({
            name: gameList.name,
            img: gameList.img,
            createdAt: now,
            updatedAt: now
        }),
    ]).then(function (value) {
        (async()=>{
            let games = new Array(gameList.gameId.length);
            for (let i = 0; i < games.length; i++){
                games[i] = await db.Game.findById(gameList.gameId[i]);
            }
            await value[1].addGames(games);
            await value[0].addGamelist(value[1]);
            console.log("Create " + JSON.stringify(value[1]));
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
        (async() =>{
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

export const queryGameListByID = (gameListId, db)=>{
    return db.GameList.findById(gameListId).then(function (gl) {
        (async()=>{
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
    });
};
