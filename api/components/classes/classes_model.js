const db = require('../../data/db-config');

module.exports = {
   getAllTypes,
   getClasses
}

async function getAllTypes() {
   return await db('classes_types as ct')
      .select('ct.*')
}

async function getClasses(){
   return await db('classes as c')
      .join('classes_types as ct', 'c.classes_types_id', 'ct.classes_types_id')
      .select('c.*', 'ct.*')
}