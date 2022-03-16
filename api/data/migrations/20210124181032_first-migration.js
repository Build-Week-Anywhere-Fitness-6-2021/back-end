exports.up = async (knex) => {
  await knex.schema
    // ROLES first
    .createTable("roles", tbl=>{
      tbl.increments('role_id')
      tbl.string('role_type').notNullable()
    })

    /* CLASSES_TYPES
      - want to be able to sort the list by types
    */
    .createTable('classes_types', tbl =>{
      tbl.increments('classes_types_id')
      tbl.string('classes_types_name').unique().notNullable()
    })

    /* USERS table
      -  users need a role that they can sign up with
    */
    .createTable('users', (tbl) => {
      tbl.increments('user_id')
      tbl.string('username', 200)
        .notNullable().unique()
      tbl.string('password', 200)
        .notNullable()
      tbl.string('email', 320)
        .notNullable()
      // tbl.timestamps(false, true)
      // JOINING
      tbl.integer('role_id')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
   
   /* CLASSES table
   classes need:
   - to be able to match with role_id of the people joining
      - instructor teaching in the class must be separated by the clients attending
   - to be editable with the role_id "instructor" #ONLY#
   - attendable by clients (and instructors and admins ?)
   */
  .createTable('classes', tbl => {
    tbl.increments('classes_id')
    tbl.string('classes_name').notNullable()
      .unique()
    tbl.string('classes_start').notNullable()
    tbl.integer('classes_duration').notNullable()
    tbl.string('classes_location')
    tbl.integer('classes_registered')
    tbl.integer('classes_maxsize').notNullable()
    tbl.string('classes_intensity') //? might need to join class_type with another intermediary table to list classes by type
    tbl.integer('classes_types_id') //! will need to join class_type with another intermediary table to list classes by type
    .unsigned()
    .notNullable()
    .references('classes_types_id').inTable('classes_types')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    //  tbl.integer('classes_participants_id')
    // .unsigned()
    // .notNullable()
    // .references('classes_participants_id').inTable('classes_participants')
    // .onDelete('CASCADE')
    // .onUpdate('CASCADE')
    
    //  tbl.string('classes_capactiy')
  })

  /* CLASSES_PARTICIPANTS
     class_participants need:
         - to be able to count the amount of participants in a class
     */
  .createTable('classes_participants', tbl=>{
    //? may need to add a spot for the participants name
    //? will probably just get it from the user_id leftJoin
    tbl.increments('classes_participants_id')
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id').inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('classes_id')
      .unsigned()
      .notNullable()
      .references('classes_id').inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  }) 
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('classes_participants')
  await knex.schema.dropTableIfExists('classes')
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('classes_types')
  await knex.schema.dropTableIfExists('roles')
}


{/* <p>Class Name: {props.class.name}</p>
<p>Class Type: {props.class.type}</p>
<p>Start Time: {props.class.start}</p>
<p>Duration: {props.class.duration}</p>
<p>Intensity: {props.class.intensity}</p>
<p>Location: {props.class.location}</p>
<p>Class Capacity: {props.class.registered}/{props.class.maxsize}</p>
<button>Register for class</button> */}