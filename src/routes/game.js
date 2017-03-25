

import {
    queryGameById as qgid,
    queryGameByName as qgname,
    addGame as addg
} from '../operation/Game';
let bodyParser = require('body-parser');
//app.use(express.bodyParser.json());

let jsonParser = bodyParser.json({type:"application/json"});

let express = require('express');
export const router = express();
//let Game= router.get('Game');
router.route("/")
    .get((req,res,next)=>{
        if(req.query.id){
          qgid(req.query.id,router.get('Game'));
          res.send(`queryId:${req.query.id}`);
        }
        else if(req.query.name){
          //res.send(`queryName:${req.query.name}`);
          qgname(req.query.name,router.get('Game'));
          res.send(`queryName:${req.query.name}`);
        }
        else {
          res.send("Error!");
        }


    })
    .delete((req,res,next)=>{






    })
    .post(jsonParser,(req,res,next)=>{
        addg({
            title: req.body.title,
            gameType: req.body.gameType,
            totalRate: req.body.totalRate,
            price: req.body.price,
            releaseCompany: req.body.releaseCompany,
            releaseDate: req.body.releaseDate,
            studio: req.body.studio
        },router.get('Game'));
        res.send(`Created Success${req.body.title}`);


    });
