import {
    queryGameById as qgid,
    queryGameByName as qgname
} from '../operation/Game';
let express = require('express');
export const router = express();
let GameList = router.get('GameList');
router.route("/")
    .get((req,res,next)=>{
        if(req.query.id){
          qgid(req.query.id,GameList);
          res.send(`queryId:${req.query.id}`);
        }
        else if(req.query.name){
          //res.send(`queryName:${req.query.name}`);
          qgname(req.query.name,GameList);
          res.send(`queryName:${req.query.name}`);
        }
        else {
          res.send("Error!");
        }


    })
    .delete((req,res,next)=>{






    })
    .post((req,res,next)=>{




    });
