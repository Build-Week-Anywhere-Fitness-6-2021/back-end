exports.up = async (knex) => {
  await knex.schema
    // ROLES first
    .createTable("roles", tbl=>{
      tbl.increments('role_id')
      tbl.string('role_type').notNullable();
    })

    /*CLASSES
      - shouldnt be able to sign up without a class_kind
    */
    .createTable('class_kinds', tbl =>{
      tbl.increments('class_kind_id');
      tbl.string('class_kind_name').unique().notNullable()
    })

    /*USERS table
      -  
    */
    .createTable('users', (tbl) => {
      tbl.increments('user_id')
      tbl.string('username', 200).notNullable()
      tbl.string('password', 200).notNullable()
      tbl.string('email', 320).notNullable()
      tbl.timestamps(false, true)
      //JOINING
      tbl.integer('role')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('class_kinds')
  await knex.schema.dropTableIfExists('roles')
}
