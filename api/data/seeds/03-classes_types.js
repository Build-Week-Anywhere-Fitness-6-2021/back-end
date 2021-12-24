
exports.seed = function(knex) {
  return knex('classes_types').insert([
    { classes_types_name: 'Pilates' },
    { classes_types_name: 'Yoga' },
    { classes_types_name: 'HIIT' },
    { classes_types_name: 'crossfit' },
    { classes_types_name: 'Bodypump' },
    ]);
};
