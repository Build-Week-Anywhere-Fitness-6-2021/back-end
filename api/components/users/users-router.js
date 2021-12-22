const router = require('express').Router()
const User = require('./users-model')

router.get('/', async (req, res, next)=>{
   res.json( await User.find())
})

router.post('/', async (req, res, next)=>{
   const addUser = await User.add(req.body)
   try{
      res.status(200).json(addUser)
      // console.log(req.body)
      next()
   } catch(err){
      next(err)
   }
})


module.exports = router