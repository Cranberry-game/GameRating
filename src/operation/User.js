let now = Date.now();

//input example

// let user = {
//     email: 'wang.ye1@husky.neu.edu',
//     name: 'Wang Ye',
//     password: 123,
//     isAdmin: true,
//     isVerified: true,
//     avatar: 'url://',
//     age: 23,
//     address: '1 Oak grove',
//     phone: '857-407-9353',
// };

export const addUser = (user,db)=>{
    (async () => {
        let u = await db.User.create({
            email: user.email,
            name: user.name,
            password: user.password,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            avatar: user.avatar,
            age: user.age,
            address: user.address,
            phone: user.phone,
            createdAt: now,
            updatedAt: now
        });
        console.log('created: ' + JSON.stringify(u));
    })();
};

export const deleteUser = (id,db)=>{
    (async () => {
         let user = await db.User.destroy({
            where:{
                id : id
            }
         });
    })();
};

export const queryUserById = (id, db)=>{
    return (async () => {
            let user = await db.User.findById(id);
            console.log(JSON.stringify(user));
            return user;
    })();
};

export const queryUserByEmail = (email, db)=>{
    return (async () => {
        let user = await db.User.findAll({
            where: {
                email : email
            },
        });
        console.log(`find user:`);
        for (let p of user) {
            console.log(JSON.stringify(p));
        }
        return user;
    })();
};