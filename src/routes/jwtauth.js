let jwt = require('jsonwebtoken');
let secret = 'secret';
export const createToken=(user)=>{
    return jwt.sign({
        username:user.name,
        avatar:user.avatar,
        email:user.email
    },secret);
};
export const verify=(token)=>{
    let decoded = jwt.verify(token,secret);
    return JSON.stringify(decoded);
};
export const tokenMid=(req,res,next)=>{
    let token = req.query.token||req.headers['auth'];
    if(token){
        jwt.verify(token,secret,(err,decoded)=>{
            if(err){
                res.send('Failed');
            }
            req.decoded = decoded;
            next();

        })
    }else{
        res.send('No valid');
    }
};

