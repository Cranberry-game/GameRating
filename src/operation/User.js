let now = Date.now();
export const addUser = (user,User)=>{
    (async () => {
        let u = await User.create({
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

