
exports.seed = function(knex) {
  return knex('classes_types').insert([
    { classes_types_name: 'Pilates' },    // 1
    { classes_types_name: 'Yoga' },       // 2
    { classes_types_name: 'HIIT' },       // 3
    { classes_types_name: 'Crossfit' },   // 4
    { classes_types_name: 'Bodypump' },   // 5
    { classes_types_name: 'Spin' },       // 6
    { classes_types_name: 'Cardio Intensive' }, // 7 
    { classes_types_name: 'Dancersize' }, // 8
    { classes_types_name: 'Kickboxing' }, // 9 
    { classes_types_name: 'Boxing' },     // 10
    { classes_types_name: 'Zumba' },      // 11
    ]);
};
