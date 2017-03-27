let now = Date.now();

// input example
// let review = {
//     userId: 1,
//     rate: 4.6,
//     content: "good",
//     gameId:8
// };

export const addReview = (review,db)=>{
    (async () => {
        let user = await db.User.findById(review.userId);
        let game = await db.Game.findById(review.gameId);
        let r = await db.Review.create({
            rate: review.rate,
            content: review.content,
            createdAt: now,
            updatedAt: now,
        });
        await user.addReview(r);
        await game.addReview(r);
        //console.log('created: ' + JSON.stringify(r));
    })();
};

export const queryReview = (gameId, db)=>{
    return (async () => {
            let game = await db.Game.findById(gameId);
            let reviews = await game.getReviews({
                attributes:['rate', 'content', 'userId']
            });
            console.log(JSON.stringify(reviews));
            return JSON.stringify(reviews);
        })();

};
