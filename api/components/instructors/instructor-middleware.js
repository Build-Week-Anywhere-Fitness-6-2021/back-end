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

module.exports = {
   verifyInstructorRole
}