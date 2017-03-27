import {
    createToken as cT,
    verify as vf,
    tokenMid
} from './jwtauth'
let express = require('express');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});

export const router = express();
router.route('/')
    .post(jsonParser,(req,res,next)=>{
        
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