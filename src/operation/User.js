let now = Date.now();
export const addUser = (user,User)=>{
    (async () => {
        let u = await User.create({
            email: User.email,
            name: User.name,
            password: User.password,
            isAdmin: User.isAdmin,
            isVerified: User.isVerified,
            avatar: User.avatar,
            age: User.age,
            address: User.email,
            phone: User.phone,
            createdAt: now,
            updatedAt: now
        });
        console.log('created: ' + JSON.stringify(u));
    })();
};

export const deleteUser = (id,User)=>{
    (async () => {
         let user = await User.destroy({
            where:{
                id : id
            }
         });
    })();
};

export const queryUserById = (id,User)=>{
    return (async () => {
                let user = await User.findAll({
                limit: 10,
                where: {
                    id : id
                },
            });
            console.log(`find ${user.length} user:`);
            for (let p of user) {
                console.log(JSON.stringify(p));
            }
            return JSON.stringify(user);
    })();
};

