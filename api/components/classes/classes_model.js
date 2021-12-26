const db = require('../../data/db-config');

module.exports = {
   getAll,

}

async function getAll() {
   return await db('classes_types as ct')
      .select('ct.*')
}