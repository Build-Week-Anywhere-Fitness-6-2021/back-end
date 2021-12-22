const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const User = require('../components/users/users-model')

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token){
    return next({status: 401, message: 'we needs token'})
  }
  jwt.verify(token, JWT_SECRET, (err, decoded)=>{
    if(err){
      return next({ status: 404, message: `your token sucks: ${err.mesage}`})
    }
    req.decodedJwt = decoded
    next()
  })
}

// AUTHORIZATION
// partial application (role => (req, res, next) )=> higher order function
const checkRole = role => (req, res, next) => {
  if( req.decodedJwt.role === role){ //! this 'role may need to be changed'
    // we leverage the information within the token payload

    next()
//   } else if (req.decodedJwt.role === role){

   } else {
     res.status(205).json({ message: 'you do not have permissions (instructor or other)'})
    //  next({ status: 403, message: 'you have no power here'})
    next()
  }
}

const checkUnusedUsername = async (req, res, next)=>{
  try {
    const { username } = req.body
    const dbUsername = await User.findBy({ username })
    // console.log(dbUsername)
    if( dbUsername ){
      return next({ message: "Looks like this username is already in our system"})
     } else {
       next()
    }
  } catch (err) {
    next(err)
  }
}

const checkUsernameValid = async (req, res, next) => {
   try {
     const { username } = req.body
     const dbUsername = await User.findBy({ username })
     console.log(dbUsername)
     if( dbUsername ){
       req.user = dbUsername
       next()
      } else {
       return next({status: 401, message: "sorry, cant find you in our system"})
     }
   } catch (err) {
     next(err)
   }
   /*
     If the username in req.body does NOT exist in the database
     status 401
     {
       "message": "Invalid credentials"
     }
   */
 }
 
 
 const validateRoleName = (req, res, next) => {
   try {
     // const [ roleName ] = await User.findBy({ role_name })
     let { role_type } = req.body
     if ( !role_type || role_type.trim() === '' ){
       req.body.role_type = 'client'
       return next()
     } 
     else if ( role_type.trim() === 'admin' ){
       return next({ message: 'Role name can not be admin', status: 422 })
     }
     else if ( role_type.trim().length >= 32 ){
       return next({ message: 'Role name can not be longer than 32 chars', status: 422 })
     } else {
       req.body.role_type = role_type.trim()
       next()
     }
   } catch (err) {
     next(err)
   }
   /*
     If the role_name in the body is valid, set req.role_name to be the trimmed string and proceed.
 
     If role_name is missing from req.body, or if after trimming it is just an empty string,
     set req.role_name to be 'student' and allow the request to proceed.
 
     If role_name is 'admin' after trimming the string:
     status 422
     {
       "message": "Role name can not be admin"
     }
 
     If role_name is over 32 characters after trimming the string:
     status 422
     {
       "message": "Role name can not be longer than 32 chars"
     }
   */
 }

module.exports = {
  restricted,
  checkRole,
  validateRoleName,
  checkUsernameValid,
  checkUnusedUsername
}
