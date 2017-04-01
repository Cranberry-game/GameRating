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

export const addGameList = (gameList, db, gameAndGameList)=>{
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
            gameAndGameList.set(value[1].name, JSON.stringify({
                gameListId: value[1].id,
                gameListName: value[1].name,
                gameListImg: value[1].img,
            }));
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
                    creator: {
                        userId: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                    },
                    img: gl[i].img,
                    description: gl[i].description,
                    createTime: gl[i].createdAt,
                    updateTime: gl[i].updatedAt,
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

export const queryGameListByCreator = (userId, db)=>{
    let r;
    return db.User.findById(userId).then(function (user) {
        return user.getGamelists();
    }).then(function (lists) {
        r = new Array(lists.length);
        for (let i = 0; i < r.length; i++){
            r[i] = {
                gameListId: lists[i].id,
                gameListName: lists[i].name
            }
        }
        return r;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const queryGameListById = (gameListId, db)=>{
    return db.GameList.findById(gameListId).then(function (gl) {
        return (async()=>{
            let games = await gl.getGames();
            let g = new Array(games.length);
            for (let i = 0; i < games.length; i++) {
                g[i] = {
                    id: games[i].id,
                    cover: games[i].cover,
                    title: games[i].title,
                    rate: games[i].totalRate,
                    description: games[i].description,
                }
            }
            let user = await gl.getUser();
            let lr = await gl.getListreviews();
            let r = new Array(lr.length);
            for (let i = 0; i < r.length; i++){
                let creator = await db.User.findById(lr[i].userId);
                r[i] = {
                    id: lr[i].id,
                    rate: lr[i].rate,
                    content: lr[i].content,
                    createAt: lr[i].createdAt,
                    creator:{
                        userId: creator.id,
                        name: creator.name,
                        email: creator.email,
                        avatar: creator.avatar,
                    }
                }
            }
            let res = {
                id: gl.id,
                gameListName: gl.name,
                creator: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                },
                description: gl.description,
                img: gl.img,
                createTime: gl.createdAt,
                updateTime: gl.updatedAt,
                games: g,
                reviews: r,

            };
            console.log(JSON.stringify(res));
            return res;
        })();
    }).catch(function (err) {
        console.log(err.name);
        return false;
    });
};

export const deleteGameList = (gameListId, db, gameAndGameList) =>{
    return db.GameList.findById(gameListId).then(function (gl) {
        gameAndGameList.del(gl.name);
        gl.destroy();
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