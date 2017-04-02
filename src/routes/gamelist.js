import {
    queryGameListById as qglid,
    queryGameListByName as qglname,
    addGameList as addgl,
    deleteGameList as dgl,
    addGameToGameList as addto,
    removeGameInGameList as rmfr,
    queryGameListByCreator as qgluid
} from '../operation/GameList';
import {updateRedis as upr} from '../operation/Redis';
let express = require('express');
export const router = express();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});

router.route("/")
    .get(async (req,res,next)=>{
        if(req.query.id){
          let glres = await qglid(req.query.id,router.get('db'));
          if(!glres){
            res.statusMessage = 'Not Found';
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
            res.send([]);           
          }else{
            res.send(glres);
          }
        }
        else if(req.query.uid){
            let glres = await qgluid(req.query.uid,router.get('db'));
            if(!glres){
                res.send([]);
            }
            else{
                res.send(glres);
            }
        }
        else{
            res.statusMessage='Bad request';
          res.status(400);
          res.send("Bad request!");
        }


    })
    //delete a gamelist by id
    .delete(async (req,res,next)=>{
        if(req.query.id){
            let suc = await dgl(req.query.id,router.get('db'));
            if(!suc){
                res.statusMessage = 'Cannot find this gamelist';
                res.status(404);
                res.send("Cannot find");
            }
            else{
                await upr(router.get('db'),router.get('cl'),router.get('ggcl'));
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
            res.statusMessage='Create fails';
            res.status(409);
            res.send("Create fails");
        }
        else{
            await upr(router.get('db'),router.get('cl'),router.get('ggcl'));
            res.status(201);
            res.send(`Created ${req.body.name} Success`);
        }

//add a game and delete a game
    }).put(jsonParser,async (req,res,next)=>{
        if(!req.headers['type']){
            res.status(401);
            res.send('Bad request');
        }
        else if(req.headers['type']=='add'){
            let suc=await addto(req.body.gameId,req.body.gameListId,router.get('db'));
            if(!suc){
                res.status(409);
                res.send("add game fails");
            }
            else{
                res.status(201);
                res.send(`add ${req.body.gameId} to ${req.body.gameListId} Success`);
            }

        }
        else if(req.headers['type']=='delete'){
            let suc=await rmfr(req.body.gameId,req.body.gameListId,router.get('db'));
            if(!suc){
                res.status(409);
                res.send("remove game fails");
            }
            else{
                res.status(201);
                res.send(`remove ${req.body.gameId} from ${req.body.gameListId} Success`);
            }

        }






    });