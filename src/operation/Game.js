/**
 * Created by WangYe on 3/24/17.
 */
//Create a new game

let now = Date.now();
export const addGame = (game,Game)=>{
    (async () => {
        let gamet = await Game.create({
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

export const deleteGame = (game,Game)=>{
    

};

export const updateGame = (game,Game)=>{

};


export const queryGameById = (id,Game)=>{
    //search a game
(async () => {
    let game = await Game.findAll({
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
})();
};

export const queryGameByName = (name,Game)=>{
    //search a game
    (async () => {
        let game = await Game.findAll({
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
    })();
};