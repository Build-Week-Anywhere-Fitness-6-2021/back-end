const router = require('express').Router();
const Class = require('./classes_model');

// To get all classes_types
router.get('/types', async (req, res, next)=>{
   const classes = await Class.getAllTypes()
   try{
      // console.log(classes)
      res.json( classes )
   } catch(err){
      next(err)
   }
})


router.get('/', async (req, res, next)=>{
   const classes = await Class.getClasses()
   try{
      res.json( classes )
   } catch(err){
      next(err)
   }
})

//! FOR POSTING
//todo = add middlewares:
/*
   1. to only allow a class to be added which allows participants to join
   2. required fields -- must have 
      - start-time
      - classes_name 
      - classes_start
      - classes_duration 
      - max_participants
      - classes_type_id
   3. 
*/ 
router.post('/', async (req, res, next)=>{
   const newClass = req.body
   const classes = await Class.addClass( newClass )
   try{
      res.status(201).json( classes )
   }catch(err){
      next(err)
   }
})

module.exports = router