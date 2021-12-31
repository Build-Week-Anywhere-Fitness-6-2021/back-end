
const verifyPayload = (req, res, next) => {
   const { username, password, email } = req.body
   if( !username || !password || !email ){
      return next({ message: 'sorry, you forgot to include necessary information -- either email, password, or username' })
   } else {
      next()
   }
}



module.exports = {
   verifyPayload,
}