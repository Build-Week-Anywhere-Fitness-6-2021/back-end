const router = require("express").Router();
const { tokenBuilder } = require('./auth_helpers');
const User = require('../components/users/users-model')

const { 
  checkUsernameValid,
  checkRoleLogin,
  // validateRoleName,
  // restrictedACCESS,
  checkUnusedUsername,
} = require('./auth-middleware');

const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS } = require("../secrets"); // use this secret!

router.post("/register", 
  checkUnusedUsername,
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
  checkUsernameValid, 
  checkRoleLogin, 
  async (req, res, next) => {
  let { username, password } = req.body;
try{
  // let bdPassword = await User.findBy({ password })
  if( bcrypt.compareSync(password, await req.user.password)){
    const token = tokenBuilder(req.user)
    const role = req.role.trim()
    res.json({token, message: `welcome back, ${ username }!! `, role})
    next()
  } else {
    next({ status: 401, message: 'cannot login' })
  }
} catch(err){
  next(err)
}
  
    
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
});

module.exports = router;
