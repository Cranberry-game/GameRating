
import {tokenMid} from './jwtauth';
import {
    queryGameById as qgid,
    queryGameByName as qgname,
    addGame as addg,
    deleteGame as dgame,
    updateGame as ugame
} from '../operation/Game';
import {queryReview as qreview} from '../operation/Reviews'
import {queryUserById as quid} from '../operation/User'
import {updateRedis as upr} from '../operation/Redis'
let bodyParser = require('body-parser');

let jsonParser = bodyParser.json({type:"application/json"});

let express = require('express');
export const router = express();
router.route("/")
    .get((req,res,next)=>{
        if(req.query.id){
          (async ()=>{
                let gameres = await qgid(req.query.id,router.get('db'));
                if(!gameres){
                    res.status(404);
                    res.send("Cannot find");
                }
                else{
                    let rvs=await qreview(gameres.id,router.get('db'));
                    for(let i=0;i<rvs.length;i++){
                        let thisuser = await quid(rvs[i].userId,router.get('db')); 
                         rvs[i].dataValues.creator = {
                            id:thisuser.id,
                            name:thisuser.name,
                            email:thisuser.email,
                            avatar:thisuser.avatar
                        };
                    }
                    gameres.reviews=await rvs;
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
                await upr(router.get('db'),router.get('cl'),router.get('ggcl'));
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
            description:req.body.description,
            screenshot:req.body.screenshot
        },router.get('db'));
        if(!suc){
            res.status(409);
            res.send("Game title is not available");
        }
        else{
            await upr(router.get('db'),router.get('cl'),router.get('ggcl'));
            res.status(201);
            res.send(`Created Success${req.body.title}`);
        }



    })
    .put(jsonParser,async (req,res,next)=>{
            let suc = await ugame({
                id:req.body.id,
                title: req.body.title,
                gameType: req.body.gameType,
                price: req.body.price,
                releaseCompany: req.body.releaseCompany,
                releaseDate: req.body.releaseDate,
                studio: req.body.studio,
                platform:req.body.platform,
                cover:req.body.cover,
                description:req.body.description,
            },router.get('db'));
            if(!suc){
                res.status(409);
                res.send('update fails');
            }
            else{
                res.send(`${req.body.title} is updated`);
            }





    });
    router.route('/suggest').get(async(req,res,next)=>{
        let client= await router.get('cl');
        if(req.query.name){
            client.keys(req.query.name + "*", function (err, reply) {
                if (err) {
                    res.status(409);
                    res.send("Error");
                }
                else{
                    res.send(reply);
                }
            })
        }
        else if(req.query.fullname){
            client.get(req.query.fullname, (err,reply)=>{
                if (err) {
                    res.status(409);
                    res.send("Error");
                }
                else{
                    res.send(reply);
                }
            })

        }






    });
    //router.route('/search').
