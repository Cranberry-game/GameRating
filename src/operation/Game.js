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
//     description: 'good game',
//     platform: ['Xbox one', 'PS4']
//     cover: 'url://';
// };

export const addGame = (game,db)=>{
    let p = new Array(game.platform.length);
    for (let i = 0; i < p.length; i++){
        p[i] = {platformName: game.platform[i]};
    }
    return db.Game.create({
        title: game.title,
        description: game.description,
        gameType: game.gameType,
        totalRate: game.totalRate,
        price: game.price,
        releaseCompany: game.releaseCompany,
        releaseDate: game.releaseDate,
        studio: game.studio,
        cover: game.cover,
        createdAt: now,
        updatedAt: now,
        platforms: p
    }, {
        include: [db.Platform]
    }).then(function (g) {
        console.log("create" + JSON.stringify(g));
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const deleteGame = (id,db)=>{
    return db.Game.destroy({
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
        return (async()=>{
            let p = await g.getPlatforms({
                attributes: ['platformName'],
            });
            let res = {
                id: g.id,
                title: g.title,
                description: g.description,
                gameType: g.gameType,
                totalRate: g.totalRate,
                price: g.price,
                releaseCompany: g.releaseCompany,
                releaseDate: g.releaseDate,
                studio: g.studio,
                cover: g.cover,
                createdAt: g.createdAt,
                updatedAt: g.updatedAt,
                platforms: p
            };
            console.log(JSON.stringify(res));
            return res;
        })();
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

export const updateGame = (game, db)=>{
    return db.Game.findById(game.id).then(function (g) {
        g.update({
            'title': game.title,
            'gameType': game.type,
            'price': game.price,
            'releaseCompany': game.releaseCompany,
            'releaseDate': game.releaseDate,
            'studio': game.studio,
            'updatedAt': now,
            'cover': game.cover,
            'description': game.description,
        })
    }).then(function () {
        return true;
    }).catch(function (err) {
        console.log(err.name);
    })
};