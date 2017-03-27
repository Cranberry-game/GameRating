 let now = Date.now();
//
// //input example
// let gameList = {
//     userId: 1,
//     gameId: [1,2]
//     name: 'Best RPG',
//     img: 'URL://',
// };
//

export const addGameList = (gameList,db)=>{
    (async () => {
        let user = await db.User.findById(gameList.userId);
        let gl = await db.GameList.create({
            name: gameList.name,
            img: gameList.img,
            createdAt: now,
            updatedAt: now
        });
        let games = new Array(gameList.gameId.length);
        for (let i = 0; i < games.length; i++){
            games[i] = await db.Game.findById(gameList.gameId[i]);
        }
        await gl.addGames(games);
        await user.addGamelist(gl);
        console.log('created: ' + JSON.stringify(gl));
    })();
};

export const queryGameListByName = (gameListName, db)=>{
    return (async () =>{
        let gl = await db.GameList.findAll({
            limit: 10,
            where: {
                name : {
                    $like: '%' + gameListName + '%'
                }
            }
        });
        let res = new Array(gl.length);
        for(let i = 0; i < gl.length; i++){
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
        return JSON.stringify(res)
    })();
};

export const queryGameListByID = (gameListId, db)=>{
    return (async () =>{
        let gl = await db.GameList.findById(gameListId);
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
        return JSON.stringify(res);
    })();
};
