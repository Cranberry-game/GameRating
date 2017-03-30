let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});
let express = require('express');
export const router = express();
let fs =require('fs');
let formidable = require('formidable');
let path = require('path');

router.route('/avatar')
      .post(jsonParser,async (req,res,next)=>{
      let form = new formidable.IncomingForm();
         form.uploadDir = router.get('dir')+"/public/avatar";
         form.parse(req,(err,fields,files)=>{
           let filename= path.basename(files.files.path);
           res.send('gamerating.info/avatar/'+filename);
           console.log('upload success');
           next();
          
        });
      });
router.route('/gl')
  .post(jsonParser,async (req,res,next)=>{
    let form = new formidable.IncomingForm();
         form.uploadDir = router.get('dir')+"/public/cover";
         form.parse(req,(err,fields,files)=>{
           let filename= path.basename(files.files.path);
           res.send('gamerating.info/cover/'+filename);
           console.log('upload success');
          
        });



    next();
  });




