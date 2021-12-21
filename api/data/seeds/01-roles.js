
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('roles').insert([
    { role_type: 'client'},
    { role_type: 'instructor'},
    { role_type: 'admin'}
  ]);
};
