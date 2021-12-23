const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

function tokenBuilder(user){
   const payload = {
      subject: user.user_id,
      username: user.username,
      role_id: user.role_id //! role_type might have to be role_id
   }
   const options = {
      expiresIn: '1d', // expiring in 1 day
   }
   //return payload, jwt secret (pulling in from ENV) , options
   return jwt.sign(payload, JWT_SECRET , options)
}


module.exports={
   tokenBuilder
}