let express = require('express');
export const router = express();

/* GET users listing. */
router.route('/')
  .get(function(req, res, next) {
      res.send('respond with a resource');
  })
  .delete((req,res,next)=>{






  })
  .post((req,res,next)=>{




  });

