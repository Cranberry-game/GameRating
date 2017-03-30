import {
    queryGameListById as qglid,
    queryGameListByName as qglname,
    addGameList as addgl,
    deleteGameList as dgl
} from '../operation/GameList';
let express = require('express');
export const router = express();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});

router.route("/")
    .get(async (req,res,next)=>{
        if(req.query.id){
          let glres = await qglid(req.query.id,router.get('db'));
          if(!glres){
            res.status(404);
            res.send('Not Found');
            //res.send(glres);
          }else{
            res.send(glres);
          }
        }
        else if(req.query.name){
          //res.send(`queryName:${req.query.name}`);
          let glres = await qglname(req.query.name,router.get('db'));
          if(!glres[0]){
            res.status(404);
            res.send('Not Found');            
          }else{
            res.send(glres);
          }
        }
        else {
          res.status(400);
          res.send("Bad request!");
        }


    })
    //delete a gamelist by id
    .delete(async (req,res,next)=>{
        if(req.query.id){
            let suc = await dgl(req.query.id,router.get('db'));
            if(!suc){
                res.status(404);
                res.send("Cannot find");
            }
            else{
                res.status(200);
                res.send(`GameList ${req.query.id} is deleted`);
            };
        }
        else {
            res.status(401);
            res.send('Not valid query');
        }

    })
    //add a gamelist
    .post(jsonParser,async (req,res,next)=>{
      //if(req.header('type')=='add')
        let suc = await addgl({
            userId: req.body.userId,
            gameId: req.body.gameId,
            name: req.body.name,
            img: req.body.img,
            totalRate:req.body.totalRate,
            description:req.body.description 
        },router.get('db'));
        if(!suc){
            res.status(409);
            res.send("Create fails");
        }
        else{
            res.status(201);
            res.send(`Created ${req.body.name} Success`);
        }


    });
