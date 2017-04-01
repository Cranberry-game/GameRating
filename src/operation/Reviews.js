let now = Date.now();

// input example

// let review = {
//     userId: 1,
//     rate: 4.6,
//     content: "good",
//     gameId:8
// };

export const addReview = (review,db)=>{
    return Promise.all([
        db.User.findById(review.userId),
        db.Game.findById(review.gameId),
        db.Review.create({
            rate: review.rate,
            content: review.content,
            createdAt: now,
            updatedAt: now,
        })
    ]).then(function (value) {
        return (async()=>{
            await value[0].addReview(value[2]);
            await value[1].addReview(value[2]);
            await updateRate(value[1]);
            console.log("Create " + JSON.stringify(value[2]));
            return true;
        })();
    }).catch(function (err) {
        console.log(err.name);
        return false;
    });
};

export const queryReview = (gameId, db)=>{
    return db.Game.findById(gameId).then(function (g) {
        return (async()=>{
            let reviews = await g.getReviews({
                attributes: ['id', 'rate', 'content', 'userId', 'createdAt']
            });
            console.log("find " + reviews.length + " reviews");
            for(let i = 0; i < reviews.length; i++){
                console.log(JSON.stringify(reviews[i]));
            }
            return reviews;
        })();
    }).catch(function (err) {
            console.log(err.name);
            return false;
    });
};

export const updateRate = (game)=>{
    (async()=>{
        let reviews = await game.getReviews();
        let newRate = 0;
        for (let i = 0; i < reviews.length; i++){
            newRate += reviews[i].rate;
        }
        game.totalRate = newRate/reviews.length;
        await game.save();
    })();
};

export const deleteReview = (reviewId, db)=>{
    return db.Review.destroy({
        where:{
            id: reviewId,
        }
    }).then(function (r) {
        console.log("Delete " + r + " reviews");
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};