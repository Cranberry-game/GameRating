import {tokenMid} from './jwtauth';
import {
    queryReview as qrv,
    addReview as addrv
} from '../operation/Reviews';
let bodyParser = require('body-parser');

let jsonParser = bodyParser.json({type:"application/json"});

let express = require('express');
export const router = express();
router.route("/")
    .get(async (req,res,next)=>{
        if(!req.query.gid){
            res.status(401);
            res.send('Not valid query');
        }
        else{
            let reviews = await qrv(req.query.gid,router.get('db'));
            res.json(reviews);
        }

    })
    .post(jsonParser,async (req,res,next)=>{
        let suc = await addrv({
            userId: req.body.userId,
            rate: req.body.rate,
            content: req.body.content,
            gameId:req.body.gameId
        },router.get('db'));
        if(!suc){
            res.status(401);
            res.send("");
        } 
        else res.send('review created');
    });