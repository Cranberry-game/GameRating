import {tokenMid} from './jwtauth';


let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});
let express = require('express');
export const router = express();
router.route('/').get(async (req,res,next)=>{
        let client= await router.get('ggcl');
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





});