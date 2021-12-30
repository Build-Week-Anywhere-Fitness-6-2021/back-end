const router = require('express').Router()
const User = require('./users-model')
const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS } = require("../../secrets"); // use this secret!

const {
   checkUnusedUsername
} = require('../../auth/auth-middleware')

const { verifyPayload } = require('./users-middleware')

router.get('/', async (req, res, next)=>{
   res.json( await User.find())
})

// this counts every user 
router.get('/count', async (req, res, next)=>{
  try{
    res.json( await User.count('user_id'))
  } catch(err){
    next(err)
  }
})

// router.post('/', async (req, res, next)=>{
//    const addUser = await User.add(req.body)
//    try{
//       res.status(200).json(addUser)
//       // console.log(req.body)
//       next()
//    } catch(err){
//       next(err)
//    }
// })


router.post("/", checkUnusedUsername, verifyPayload, async (req, res, next) => {
  let user = req.body

  // save on the db
  const hash = bcrypt.hashSync( user.password, BCRYPT_ROUNDS )
  user.password = hash

  await User.add(user)
    .then(saved =>{
      // res.status(201).json(saved)
      res.status(201).json({ message: `great to see you, ${saved.username}`})
    })
    .catch(next)

  /**
   [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }
   
   response:
   status 201
   {
     "user"_id: 3,
     "username": "anna",
     "role_name": "angel"
    }
    */
  });


module.exports = router