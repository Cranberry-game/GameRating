import {
    queryUserById as quid,
    addUser as addu
} from '../operation/User';
let bodyParser = require('body-parser');

let jsonParser = bodyParser.json({type:"application/json"});


let express = require('express');
export const router = express();

/* GET users listing. */
router.route('/')
  .get(function(req, res, next) {
    if(req.query.id){
      (async()=>{
          let ures = await quid(req.query.id,router.get('db'));
          if(!ures) {
            res.status(404);
            res.end("Cannot find");
          }
          res.send(ures);
      })();
        }
    else {
          res.status(400);
          res.send("Error!");
        }


  })
  .delete((req,res,next)=>{






  })
  .post(jsonParser,async (req,res,next)=>{
    let err = await addu({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            isAdmin: false,
            isVerified: true,
            avatar: req.body.avatar,
            age: req.body.age,
            address: req.body.address,
            phone: req.body.phone
        },router.get('db'));
        if(err==false){
          res.status(409);
          res.send('Created failed');
        }
        else {
          res.status(201);
          res.send('User Created');
        }
  });

