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
    return db.User.create({
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
        }).then(function (u) {
            console.log('created: ' + JSON.stringify(u));
            return u;
        }).catch(function (err) {
            console.log(err.name);
            return false;
        });
};

export const deleteUser = (id,db)=>{
    return db.User.destroy({
        where:{
            id: id
        }
    }).then(function (u) {
        console.log("Delete " + u + " user");
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const queryUserById = (id, db)=>{
    return db.User.findById(id)
        .then(function (u){
            console.log("find: " + JSON.stringify(u));
            return u;
    }).catch(function (err) {
            console.log(err.name);
            return false;
        })
};

export const queryUserByEmail = (email, db)=>{
    return db.User.findAll({
        where:{
            email: email,
        }
    })
        .then(function (u) {
            console.log("find: " + JSON.stringify(u));
            return u;
    }).catch(function (err) {
            console.log(err.name);
            return false;
    })
};

export const queryAllUser = (db)=>{
    return db.User.findAll().then(function (users) {
        console.log(JSON.stringify(users));
        return users;
    }).catch(function (err) {
        console.log(err.name);
    })
};

export const updateUser = (user, db)=>{
    return db.User.findById(user.id).then(function (u) {
        u.update({
            'name': user.name,
            'password': user.password,
            'avatar': user.avatar,
            'age': user.age,
            'address': user.address,
            'phone': user.phone,
            'updatedAt': now,
        })
    }).then(function () {
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const updatePriorityOfUser = (userId, isAdmin, db)=>{
    return db.User.findById(userId).then(function (user) {
        user.update({
            isAdmin: isAdmin,
        })
    }).then(function (user) {
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};

export const verifyOrUnverifyUser = (userId, isVerified, db)=>{
    return db.User.findById(userId).then(function (user) {
        user.update({
            isVerified: isVerified,
        })
    }).then(function (user) {
        return true;
    }).catch(function (err) {
        console.log(err.name);
        return false;
    })
};