let now = Date.now();

//input example

// let game = {
//     title: 'CS',
//     gameType: 'FPS',
//     totalRate: 0,
//     price: '$21',
//     releaseCompany: 'V',
//     releaseDate: '2/5/1998',
//     studio: 'default',
//     platform: ['Xbox one', 'PS4']
// };

export const addGame = (game,db)=>{
    let p = new Array(game.platform.length);
    for (let i = 0; i < p.length; i++){
        p[i] = {platformName: game.platform[i]};
    }
    return db.Game.create({
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
    }).then(function (g) {
        console.log("create" + JSON.stringify(g));
        return g;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const deleteGame = (id,db)=>{
    db.Game.destroy({
        where:{
            id : id
        }
    }).then(function (g) {
        console.log("Delete " + g + " Game");
        return true
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const queryGameById = (id,db)=>{
    return db.Game.findById(id).then(function (g) {
        console.log("find: " + JSON.stringify(g));
        return g;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const queryGameByName = (name,db)=>{
    return db.Game.findAll({
        limit: 10,
        where: {
            title : {
                $like: '%' + name + '%'
            }
        },
        order : [['totalRate', 'DESC']]
    }).then(function (g) {
        console.log(JSON.stringify(g));
        return g;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};