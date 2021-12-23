// const User = require('../users/users-model')

// const bcrypt = require("bcryptjs");
// const { BCRYPT_ROUNDS } = require("../../secrets"); // use this secret!


const verifyInstructorRole = (req, res, next) => {
   if( req.role.trim() === 'instructor' || req.role.trim() === "admin"){
      next()
   } else {
      res.status(208).json({ message: 'sorry, you are not authorized here'})
   }
   
}

const checkInstructorCode = (req, res, next) =>{
   const { instructorCode } = req.body
   try{
     if( !instructorCode || instructorCode.trim() !== 'WhosYourDaddy' ){
       return next({ message: `Invalid instructor code ${ instructorCode }`})
     } else {
       req.body.role_id = 2
       next()
     }
   } catch(err){
     next(err)
   }
 }

module.exports = {
   verifyInstructorRole,
   checkInstructorCode,
}