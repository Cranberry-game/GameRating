import {tokenMid} from './jwtauth';
import {
    queryListReview as qrv,
    addListReview as addrv,
    deleteListReview as dlrv
} from '../operation/ListReviews';
let bodyParser = require('body-parser');

let jsonParser = bodyParser.json({type:"application/json"});

let express = require('express');
export const router = express();
router.route("/")
    .get(async (req,res,next)=>{
        if(!req.query.glid){
            res.status(401);
            res.send('Not valid query');
        }
        else{
            let reviews = await qrv(req.query.gid,router.get('db'));
            if(!reviews){
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
            gameListId:req.body.gameListId
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
                let suc = await dlrv(req.qeury.id,router.get('db'));
                if(!suc){
                    res.status(404);
                    res.send("Cannot find");
                }
                else{
                    res.status(200);
                    res.send(`GameListReview ${req.query.id} is deleted`);
                };
        }
        else {
            res.status(401);
            res.send('Not valid query');
        }

    });