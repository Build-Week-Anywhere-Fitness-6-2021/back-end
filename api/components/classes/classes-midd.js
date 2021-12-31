
// must have a max-participants greater than 1
const checkMax = (req, res, next) =>{
   const { classes_max_participants } = req.body
   try {
      if( classes_max_participants <= 1 ){
         res.status(404).json({ message: 'sorry, max_participants need to be more than 1'})
      } else {
         res.status(200).json({ classes_max_participants })
      }
   }catch(err){
      next(err)
   }
}

module.exports = {
   checkMax
}