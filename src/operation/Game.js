let now = Date.now();
export const addGame = (game,db)=>{
    let p = new Array(game.platform.length);
    for (let i = 0; i < p.length; i++){
        p[i] = {platformName: game.platform[i]};
    }
    (async () => {
        let gamet = await db.Game.create({
            title: game.title,
            gameType: game.gameType,
            totalRate: game.totalRate,
            price: game.price,
            releaseCompany: game.releaseCompany,
            releaseDate: game.releaseDate,
            studio: game.studio,
            createdAt: now,
            updatedAt: now,
            platforms: p
        }, {
            include: [db.Platform]
        });
        console.log('created: ' + JSON.stringify(gamet));
    })();
};

export const deleteGame = (id,db)=>{
    (async () => {
        let game = await db.Game.destroy({
            where:{
                id : id
            }
        });
    })();
};

// export const updateGame = (game,Game)=>{
//     (async () => {
//         let game = await Game.update({
//             where:{
//                 id : id
//             }
//         });
//     })();
// };


export const queryGameById = (id,db)=>{
    return (async () => {
        let game = await db.Game.findAll({
            limit: 10,
            where: {
                id : id
            },
            order : [['totalRate', 'DESC']]
        });
        console.log(`find ${game.length} game:`);
        for (let p of game) {
           console.log(JSON.stringify(p));
        }
        return JSON.stringify(game);
    })();
};

export const queryGameByName = (name,db)=>{
    return (async () => {
        let game = await db.Game.findAll({
            limit: 10,
            where: {
                title : {
                    $like: '%' + name + '%'
                }
            },
            order : [['totalRate', 'DESC']]
        });
        console.log(`find ${game.length} game:`);
        for (let p of game) {
            console.log(JSON.stringify(p));
        }
        return JSON.stringify(game);
    })();
};