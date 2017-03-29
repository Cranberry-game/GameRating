import {
    createToken as cT,
    verify as vf,
    tokenMid
} from './jwtauth';
import {queryUserByEmail as findU} from '../operation/User';
let express = require('express');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});

export const router = express();
router.route('/')
    .post(jsonParser,async(req,res,next)=>{
        let email=req.body.email;
        let pswd=req.body.password;
        
        if(!(email&&pswd)) {
            res.status(400);
            res.send('Invalid');

        }
        else {
                let users=await findU(email,router.get('db'));
                let user = users[0];
                if(!user||user.password!=pswd){
                    res.status(401);
                    res.send("User name or password is invalid!");
                }
                else 
                {
                    res.send({
                    token:cT({
                        username:user.name,
                        avatar:user.avatar,
                        email:user.email}),
                    expire:"infinite"
                });
                }
                
        };
        next();
    })
    .get(jsonParser,tokenMid,(req,res,next)=>{
        // try{
        //     res.send(vf(req.query.token));
        // }catch(err){
        //     res.send('Invalid token');
        // }
        res.json(req.decoded);



    });