let bodyParser = require('body-parser');
let jsonParser = bodyParser.json({type:"application/json"});
let express = require('express');
export const router = express();
let fs =require('fs');
let formidable = require('formidable');
let path = require('path');

router.route('/avatar')
      .post(jsonParser,async(req,res,next)=>{
          let form = new formidable.IncomingForm();
          form.keepExtensions=true;
          form.uploadDir = router.get('dir')+"/public/avatar";
          form.parse(req,(err,fields,files)=>{
           let filename= path.basename(files.files.path);
           res.send(JSON.stringify({url:'gamerating.info/avatar/'+filename}));
           console.log('upload success');
          next();
          });
      });
router.route('/cover')
  .post(jsonParser,async (req,res,next)=>{
    let form = new formidable.IncomingForm();
        form.keepExtensions=true;
         form.uploadDir = await router.get('dir')+"/public/cover";
         form.parse(req,(err,fields,files)=>{
           let filename= path.basename(files.files.path);
           res.send(JSON.stringify({url:'gamerating.info/cover/'+filename}));
           console.log('upload success');
          next();
        });



    
  });
router.route('/scshot')
  .post(jsonParser,async (req,res,next)=>{
    let form = new formidable.IncomingForm();
        form.keepExtensions=true;
        form.multiples = true;
         form.uploadDir = router.get('dir')+"/public/screenshot";
         form.parse(req,async (err,fields,files)=>{
            let urls = new Array(files.files.length);
            for(let i=0;i<files.files.length;i++){
              let filename = await path.basename(files.files[i].path);
              urls[i] = 'gamerating.info/screenshot/'+filename; 
            }
            
            res.send(JSON.stringify({url:urls}));
           console.log('upload success');
              next();
        });




  });


