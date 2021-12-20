const router = require('express').Router()
const User = require('./users-model')

router.get('/', async (req, res, next)=>{
   res.json( await User.get)
})


module.exports = router