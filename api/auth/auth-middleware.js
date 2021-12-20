const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')

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
  if(req.decodedJwt.role === role){
    // we leverage the information within the token payload
    next()
  } else {
    next({ status: 403, message: 'you have no power here'})
  }
}

module.exports = {
  restricted,
  checkRole,
}
