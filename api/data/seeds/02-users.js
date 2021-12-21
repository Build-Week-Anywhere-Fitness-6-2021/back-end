
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'david', email: 'rowValue1@gmail.com', password:'1234', role: 2},
        {username: 'william', email: 'rowValue2@gmail.com', password:'1234', role: 2},
        {username: 'brettsmith', email: 'brett@smith.com', password:'1234', role: 2}
      ]);
};
