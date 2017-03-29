let jwt = require('jsonwebtoken');
let secret = 'secret';
export const createToken=(user)=>{
    return jwt.sign(user,secret);
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
                res.status(401);
                res.send('Authorization Failed');
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        res.status(401);
        res.send('Unauthorized');
    }
};

