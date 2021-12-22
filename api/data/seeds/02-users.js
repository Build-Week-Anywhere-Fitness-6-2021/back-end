
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'fletcher_d', email: 'david@fletcher.com', password:'$2a$08$ZPjq/nsa1dNfvFKY54hh.uUGDDHTZcqGnVgq.GVLFSfpaY9K753Im', role_id: 3},
        {username: 'will', email: 'will@buchanan.com', password:'$2a$08$ZPjq/nsa1dNfvFKY54hh.uUGDDHTZcqGnVgq.GVLFSfpaY9K753Im', role_id: 2},
        {username: 'brettsmith', email: 'brett@smith.com', password:'$2a$08$ZPjq/nsa1dNfvFKY54hh.uUGDDHTZcqGnVgq.GVLFSfpaY9K753Im', role_id: 2},
        {username: 'aihe_d', email: 'david@aihe.com', password:'$2a$08$ZPjq/nsa1dNfvFKY54hh.uUGDDHTZcqGnVgq.GVLFSfpaY9K753Im', role_id: 2},
        {username: 'ted', email: 'ted@velchko.com', password:'$2a$08$ZPjq/nsa1dNfvFKY54hh.uUGDDHTZcqGnVgq.GVLFSfpaY9K753Im', role_id: 2},
        {username: 'richardo', email: 'richardo@castillo.com', password:'$2a$08$ZPjq/nsa1dNfvFKY54hh.uUGDDHTZcqGnVgq.GVLFSfpaY9K753Im', role_id: 2},
      ]);
};
