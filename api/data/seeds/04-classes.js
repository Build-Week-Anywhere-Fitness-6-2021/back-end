
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('classes').insert([
    {
      classes_name: "Fart Yoga",
      classes_types_id: 2,
      classes_start: "7:00 a.m.",
      classes_duration: 30,
      classes_intensity: "low",
      classes_location: "north",
      classes_registered: 1,
      classes_max_participants: 4,
  },
  {
      classes_name: "Cycle Sadness",
      classes_types_id: 6,
      classes_start: "9:00 a.m.",
      classes_duration: 60,
      classes_intensity: "high",
      classes_location: "south",
      classes_registered: 3,
      classes_max_participants: 8
  },
  {
      classes_name: "Boulder Fletching",
      classes_types_id: 8,
      classes_start: "11:00 a.m.",
      classes_duration: 60,
      classes_intensity: "high",
      classes_location: "south",
      classes_registered: 5,
      classes_max_participants: 10
  },
  {
      classes_name: "Boulder Crushing",
      classes_types_id: 8,
      classes_start: "11:00 a.m.",
      classes_duration: 60,
      classes_intensity: "high",
      classes_location: "south",
      classes_registered: 5,
      classes_max_participants: 10
  },
  ]);
};
