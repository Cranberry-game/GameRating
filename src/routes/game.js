
import {tokenMid} from './jwtauth';
import {
    queryGameById as qgid,
    queryGameByName as qgname,
    addGame as addg,
    deleteGame as dgame
} from '../operation/Game';
let bodyParser = require('body-parser');

let jsonParser = bodyParser.json({type:"application/json"});

let express = require('express');
export const router = express();
//let Game= router.get('Game');
router.route("/")
    .get(tokenMid,(req,res,next)=>{
        if(req.query.id){
          (async ()=>{
                let gameres = await qgid(req.query.id,router.get('db'));
                if(!gameres){
                    res.status(404);
                    res.send("Cannot find");
                }
                else{
                    res.send(gameres);
                }
          })();
        }
        else if(req.query.name){
          //res.send(`queryName:${req.query.name}`);
          (async ()=>{
                let gameres = await qgname(req.query.name,router.get('db'));
                if(!gameres[0]){
                    res.status(404);
                    res.send("Cannot find");
                }
                else{
                    res.send(gameres);
                }
          })();
        } 
        else {
            res.status(400);
            res.send("Bad Request!");
        }


    })
    //delete a game by id
    .delete(async (req,res,next)=>{
        if(req.query.id){
            let suc = await dgame(req.query.id,router.get('db'));
            if(!suc){
                res.status(404);
                res.send("Cannot find");
            }
            else{
                res.status(200);
                res.send(`Game ${req.query.id} is deleted`);
            };
        }
        else {
            res.status(401);
            res.send('Not valid query');
        }





    })
    //add a game
    .post(jsonParser,async (req,res,next)=>{
            let suc = await addg({
            title: req.body.title,
            gameType: req.body.gameType,
            totalRate: req.body.totalRate,
            price: req.body.price,
            releaseCompany: req.body.releaseCompany,
            releaseDate: req.body.releaseDate,
            studio: req.body.studio,
            platform:req.body.platform,
            cover:req.body.cover,
            description:req.body.description
        },router.get('db'));
        if(!suc){
            res.status(409);
            res.send("Create fails");
        }
        else{
            res.status(201);
            res.send(`Created Success${req.body.title}`);
        }



    });
