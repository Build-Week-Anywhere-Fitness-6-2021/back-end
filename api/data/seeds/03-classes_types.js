
exports.seed = function(knex) {
  return knex('classes_types').insert([
    { classes_types_name: 'Pilates' },
    { classes_types_name: 'Yoga' },
    { classes_types_name: 'HIIT' },
    { classes_types_name: 'Crossfit' },
    { classes_types_name: 'Bodypump' },
    { classes_types_name: 'Spin' },
    { classes_types_name: 'Cardio Intensive' },
    { classes_types_name: 'Dancersize' },
    { classes_types_name: 'Kickboxing' },
    { classes_types_name: 'Boxing' },
    { classes_types_name: 'Zumba' },
    ]);
};
