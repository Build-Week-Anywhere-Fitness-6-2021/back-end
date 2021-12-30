const router = require('express').Router();
const Thing = require('./participants_model.js')

// i want each class to have an unlimited amount of users 
// who can register with them

// this will tell us who is registered for the class
router.get('/registered', async (req, res, next) =>{

})

router.get('/count', async (req, res, next)=>{
   let count = await Thing.count('user_id')
   try{
      if(req.class_id === 1){
         res.json( count )
      }
   } catch(err){
      next(err)
   }
})

module.exports = router