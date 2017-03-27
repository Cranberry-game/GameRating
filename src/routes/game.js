
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
                res.send(gameres);
          })();
        }
        else if(req.query.name){
          //res.send(`queryName:${req.query.name}`);
          (async ()=>{
                let gameres = await qgname(req.query.name,router.get('db'));
                res.send(gameres);
          })();
        }
        else {
          res.send("Error!");
        }


    })
    .delete((req,res,next)=>{
        //dgame(req.id,router.get('Game'));





    })
    .post(jsonParser,(req,res,next)=>{
        addg({
            title: req.body.title,
            gameType: req.body.gameType,
            totalRate: req.body.totalRate,
            price: req.body.price,
            releaseCompany: req.body.releaseCompany,
            releaseDate: req.body.releaseDate,
            studio: req.body.studio,
            platform:req.body.platform
        },router.get('db'));
        res.send(`Created Success${req.body.title}`);



    });
