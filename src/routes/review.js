import {tokenMid} from './jwtauth';
import {
    queryReview as qrv,
    addReview as addrv,
    deleteReview as drv
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
            if(!reviews[0]){
                res.status(404);
                res.send('Cannot find');
            }
            else{
                res.status(200);
                res.json(reviews);
            }
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
        else {
            res.status(201);
            res.send('review created');
        }
    })
    .delete(async (req,res,next)=>{
        if(req.query.id){
                let suc = await drv(req.query.id,router.get('db'));
                if(!suc){
                    res.status(404);
                    res.send("Cannot find");
                }
                else{
                    res.status(200);
                    res.send(`GameReview ${req.query.id} is deleted`);
                };
        }
        else {
            res.status(401);
            res.send('Not valid query');
        }

    });;