export const updateRedis = (db, clint, gameAndGameList)=>{
    (async()=>{
        await clint.flushall();
        await gameAndGameList.flushall();
        let games = await db.Game.findAll();
        for (let i = 0; i < games.length; i++){
            clint.set(games[i].title, JSON.stringify({
                gameId: games[i].id,
                gameTitle: games[i].title,
                gameCover: games[i].cover,
            }));
            gameAndGameList.set(games[i].title, JSON.stringify({
                gameId: games[i].id,
                gameTitle: games[i].title,
                gameCover: games[i].cover,
            }));
        }
        let gameLists = await db.GameList.findAll();
        for (let i = 0; i < gameLists.length; i++){
            gameAndGameList.set(gameLists[i].name, JSON.stringify({
                gameListId: gameLists[i].id,
                gameListName: gameLists[i].name,
                gameImg: gameLists[i].img,
            }));
        }
    })();
};
