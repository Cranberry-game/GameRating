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
          let ures = await quid(req.query.id,router.get('User'));
          res.send(ures);
      })();
        }
    else {
          res.send("Error!");
        }


  })
  .delete((req,res,next)=>{






  })
  .post(jsonParser,(req,res,next)=>{
    addu({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            isVerified: req.body.isVerified,
            avatar: req.body.avatar,
            age: req.body.age,
            address: req.body.email,
            phone: req.body.phone
        },router.get('User'));
        res.send('User Created');
  });

