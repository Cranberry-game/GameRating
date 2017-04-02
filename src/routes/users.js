import {
    queryUserById as quid,
    addUser as addu,
    deleteUser as du,
    updateUser as upu,
    updatePriorityOfUser as upp,
    verifyOrUnverifyUser as vu,
    queryAllUser as qau
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
  .delete(async (req,res,next)=>{
        if(req.query.id){
            let suc = await du(req.query.id,router.get('db'));
            if(!suc){
                res.status(404);
                res.send("Cannot find");
            }
            else{
                res.status(200);
                res.send(`User ${req.query.id} is deleted`);
            };
        }
        else {
            res.status(401);
            res.send('Not valid query');
        }





  })
  .post(jsonParser,async (req,res,next)=>{
    
    let err = await addu({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            isAdmin: false,
            isVerified: false,
            avatar: req.body.avatar,
            age: req.body.age,
            address: req.body.address,
            phone: req.body.phone
        },router.get('db'));
        if(err==false){
            res.statusMessage='This email is not available!';
          res.status(409);
          res.send('This email is not available!');
        }
        else {
          res.status(201);
          res.send(`User ${req.body.name} is created`);
        }
  })
  .put(jsonParser,async (req,res,next)=>{
        let suc = await upu({
            id:req.body.id,
            name: req.body.name,
            password: req.body.password,
            avatar: req.body.avatar,
            age: req.body.age,
            address: req.body.address,
            phone: req.body.phone
        },router.get('db'));
        if(!suc){
          res.status(409);
          res.send('Update failed');
        }
        else {
          res.status(201);
          res.send('User is Updated');
        }




  });
  router.route('/auth').put(jsonParser,async(req,res,next)=>{
      let type=req.headers['type'];
        if(!type||(type!='priority'&&type!='verify')){
            res.status(401);
            res.send('Bad request');
        }
        else if(req.headers['type']=='priority'){//change admin   
            if(req.body.isAdmin==undefined){
                res.status(401);
                res.send('Bad request');
            }
            else{
                let suc=await upp(req.body.userId,req.body.isAdmin,router.get('db'));
                if(!suc){
                    res.status(409);
                    res.send('Update failed');
                }
                else {
                    res.status(201);
                    res.send('Priority changed');
                }
            }
        }
        else {//verify
            if(req.body.isVerified==undefined){
                res.status(401);
                res.send('Bad request');
            }
            else{
                let suc=await vu(req.body.userId,req.body.isVerified,router.get('db'));
                if(!suc){
                    res.status(409);
                    res.send('Update failed');
                }
                else {
                    res.status(201);
                    res.send('Verifity changed');
                }
            }

        }
  });
  router.route('/all').get(async(req,res,next)=>{
    let ures= await qau(router.get('db'));
    res.send(ures);
  });

