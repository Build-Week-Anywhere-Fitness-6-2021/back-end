const db = require('../../data/db-config');

module.exports = {
   getAllTypes,
   getClasses,
   addClass,
}

async function getAllTypes() {
   return await db('classes_types as ct')
      .select('ct.*')
}

// why did i need to join this?
//! to make sure there was a whole list o
async function getClasses(){
   return await db('classes as c')
      .join('classes_types as ct', 'c.classes_types_id', 'ct.classes_types_id')
      .select('c.*', 'ct.*')
}

async function addClass(classi){
   const [ newClassObj ] = await db('classes').insert(
   //    {
   //    classes_name: classi.classes_name,
   //    classes_start: classi.classes_start,
   //    classes_duration: classi.classes_duration,
   //    classes_location: classi.classes_location,
   //    classes_registered: classi.classes_registered,
   //    classes_max_participants: classi.classes_max_participants,
   //    classes_intensity: classi.classes_intensity,
   //    classes_types_id: classi.classes_types_id,
   // } 
   classi, [
         'classes_name',
         'classes_start',
         'classes_duration',
         'classes_location',
         'classes_registered',
         'classes_max_participants',
         'classes_intensity',
         'classes_types_id',
      ]
   )
   return newClassObj
}