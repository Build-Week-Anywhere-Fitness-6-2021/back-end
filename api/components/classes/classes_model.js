const db = require('../../data/db-config');

module.exports = {
   getAllTypes,
   getClasses,
   addClass,
   findBy,
   // findById
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
   //    classes_maxsize: classi.classes_maxsize,
   //    classes_intensity: classi.classes_intensity,
   //    classes_types_id: classi.classes_types_id,
   // },
   classi, 
   [
         'classes_name',
         'classes_start',
         'classes_duration',
         'classes_location',
         'classes_registered',
         'classes_maxsize',
         'classes_intensity',
         'classes_types_id',
         // 'classes_types_name'
      ]
   )
   return newClassObj
}

async function findBy(filter){
   return await db('classes').where(filter).first()
}


async function getClassTypeName(id){
      return await db('classes_types as ct')
      .where('ct.classes_types_id', id)
         .join('classes as c', 'ct.classes_types_id', 'c.classes_types_id')
         .select( 'c.*')
         .first()
}