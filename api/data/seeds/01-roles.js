
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('roles').insert([
    { role_name: 'client'},
    { role_name: 'instructor'},
    { role_name: 'manager'}
  ]);
};
