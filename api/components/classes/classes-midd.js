const Class = require('./classes_model')

// must have a max-participants greater than 1
const checkMax = (req, res, next) =>{
   const { classes_maxsize } = req.body
   try {
      if( classes_maxsize <= 1 || !classes_maxsize ){
         res.status(400).json({ message: 'sorry, make sure your max size is included and more than 1 person are allowed to join' })
      } else {
         // res.status(200).json({ classes_maxsize })
         next()
      }
   }catch(err){
      next(err)
   }
}

const checkName = async (req, res, next) =>{
   const { classes_name } = req.body;
   const dbName = await Class.findBy({ classes_name })
   try {
      if ( !classes_name ){
         res.status(400).json({ message: 'Sorry, You must include a name for your class. Please check your entry and try again' })
      } else if ( dbName ){
         res.status(400).json({ message: 'In order to distinguish classes, please think of a more unique name! This Class Name is already taken.' })
      } else {
         // res.status(200).json({ classes_name })
         // res.status(200).json({message: 'your class was added!'})
         next()
      }
   } catch(err){
      next(err)
   }
}

const checkBody = async (req, res, next) =>{
   const { classes_start, classes_duration, classes_types_id } = req.body;
   const dbTypes = await Class.findBy({ classes_types_id })
   //?
   try{
      if( !classes_start || !classes_duration || !classes_types_id ){
         return next({ message: 'You must have both a Start Time and a Duration stated in the above form '})
      // } else if ( !classes_types_id ){
      //    return next({ message: 'you need to submit a class'})
      } else if ( !dbTypes ){
         return next({ message: 'This class Type does not exist in our system. Please contact an Admin to add it, or select one from the above'})
      } else {
         console.log(dbTypes)
         //! this is called setting headers -- DONT DO THIS -- res.status(200).json({ classes_types_name: dbTypes.classes_types_name  })
         // next({ classes_types_name: dbTypes.classes_types_name  })
         // req.classes_types_name = dbTypes.classes_types_name
         next()
      }
   } catch(err){
      next(err)
   }
}

module.exports = {
   checkMax,
   checkName,
   checkBody
}