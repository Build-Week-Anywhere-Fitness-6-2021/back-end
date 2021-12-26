const router = require('express').Router();
const Class = require('./classes_model');

// To get all classes_types
router.get('/types', async (req, res, next)=>{
   const classes = await Class.getAllTypes()
   try{
      // console.log(classes)
      res.json(classes)
   } catch(err){
      next(err)
   }
})


router.get('/', async (req, res, next)=>{
   const classes = await Class.getClasses()
   try{
      res.json(classes)
   } catch(err){
      next(err)
   }
})

module.exports = router