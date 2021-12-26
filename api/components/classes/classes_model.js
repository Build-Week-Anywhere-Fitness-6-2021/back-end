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
      .select('c.*')
}