const router = require("express").Router();
const { tokenBuilder } = require('../../auth/auth_helpers');
const User = require('../users/users-model');

const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS } = require("../../secrets"); // use this secret!

const { 
   checkUsernameValid,
   checkRoleLogin,
   // validateRoleName,
   // restrictedACCESS,
   checkUnusedUsername,
   checkInstructorCode
 } = require('../../auth/auth-middleware');

 const { verifyInstructorRole } = require('./instructor-middleware');

router.post("/register", 
   checkUnusedUsername,
   checkInstructorCode, 
async (req, res, next) => {
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

router.post("/login", 
      checkUsernameValid, //todo: will need to change this for instructor i think?
                           //! will do after i have the db set up to take instructors separately
      checkRoleLogin,
      verifyInstructorRole,
   async (req, res, next) => {
   let { username, password } = req.body;
   try{
   // let bdPassword = await User.findBy({ password })
   if( bcrypt.compareSync(password, await req.user.password)){
      const token = tokenBuilder(req.user)
      const role = req.role
      res.json({token, message: `welcome back, ${ username }!! `, role})
      next()
   } else {
      next({ status: 401, message: 'cannot login' })
   }
   } catch(err){
   next(err)
   }
});
  

module.exports = router