const router = require('express').Router();
const Class = require('./classes_model');


router.get('/', async (req, res, next)=>{
   const classes = await Class.getAll()
   try{
      // console.log(classes)
      res.json(classes)
   } catch(err){
      next(err)
   }
})


module.exports = router