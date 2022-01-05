
//! this seed will not work because there is no column for information to populate yet
exports.seed = function(knex) {
    // Inserts seed entries
  return knex('classes_participants').insert([
    {user_id: 1, classes_id: 3}, //todo: these will need to be linked to the user_id for naming purposes
    {user_id: 4, classes_id: 4},
    {user_id: 4, classes_id: 2},
    {user_id: 2, classes_id: 1}
  ]);
};
