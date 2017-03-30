let now = Date.now();

// input example

// let listReview = {
//     userId: 1,
//     rate: 4.6,
//     content: "good",
//     gameListId: 8
// };

export const addListReview = (listReview,db)=>{
    Promise.all([
        db.User.findById(listReview.userId),
        db.GameList.findById(listReview.gameListId),
        db.ListReview.create({
            rate: listReview.rate,
            content: listReview.content,
            createdAt: now,
            updatedAt: now,
        })
    ]).then(function (value) {
        (async()=>{
            console.log(JSON.stringify(value[1]));
            await value[0].addListreview(value[2]);
            await value[1].addListreview(value[2]);
            await updateRate(value[1]);
            console.log("Create " + JSON.stringify(value[2]));
            return true;
        })();
    }).catch(function (err) {
        console.log(err.name);
        return false;
    });
};

export const queryListReview = (gameListId, db)=>{
    return db.GameList.findById(gameListId).then(function (g) {
        return (async()=>{
            let reviews = await g.getListreviews({
                attributes: ['rate', 'content', 'userId']
            });
            console.log("find " + reviews.length + " reviews")
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

export const updateRate = (gameList)=>{
    (async()=>{
        let reviews = await gameList.getListreviews();
        let newRate = 0;
        for (let i = 0; i < reviews.length; i++){
            newRate += reviews[i].rate;
        }
        gameList.totalRate = newRate/reviews.length;
        await gameList.save();
    })();
};

export const deleteListReview = (ListReviewId, db)=>{
    return db.ListReview.destroy({
        where:{
            id: ListReviewId,
        }
    }).then(function (r) {
        console.log("Delete " + r + " list reviews");
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};