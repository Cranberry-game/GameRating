import {
    queryGameListByID as qglid,
    queryGameListByName as qglname
} from '../operation/GameList';
let express = require('express');
export const router = express();
let GameList = router.get('GameList');
router.route("/")
    .get(async (req,res,next)=>{
        if(req.query.id){
          let glres = await qglid(req.query.id,GameList);
          if(!glres){
            res.status(404);
            res.send('Not Found');
          }else{
            res.send(glres);
          }
        }
        else if(req.query.name){
          //res.send(`queryName:${req.query.name}`);
          let glres = qglname(req.query.name,GameList);
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
    .delete((req,res,next)=>{






    })
    //add a gamelist
    .post(jsonParser,async (req,res,next)=>{
      //if(req.header('type')=='add')
        let suc = await addg({
            userId: req.body.userId,
            gameId: req.body.gameId,
            name: req.body.name,
            img: req.body.img
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
