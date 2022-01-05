const db = require("../../data/db-config")

module.exports = {
  add,
  find,
  findBy,
  findById,
  count
}

// this is mostly boilerplate - i need to go back thru and fix things

// connecting users and roles (which should def be altered) i need to have something for clients
async function find() {
  return await db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.*", 'r.role_type as role')
}

// async function findBy(filter) {
//   return await db("users as u")
//     .join("roles as r", "u.role_id", "r.role_id")
//     .select("*")
//     .where(filter)
//     .first()
// }

async function findBy(filter){
   return await db('users').where(filter).first()
}

// to count the number of rows in a column of the table
async function count(column){
  return await db('users').count(column)
}

//! I HAVE NO IDEA IF THIS IS GONNA WORK
// async function countSpecific(column, id){
//   return await db('users').count(column).where('class_id', id === 5)
// }

// to addd a user to the list
async function add(user) {
  const [ newUserObj ] = await db("users").insert(
     {
        username: user.username,
        password: user.password,
        email: user.email,
        role_id: user.role_id ? user.role_id : 1 , //! trying to fix errs
     }, [
       'username', 
       'password', 
       'email', 
       'role_id' //! trying to fix errors
      ]
   ).orderBy("users.role_id");
  return newUserObj
}

function findById(id) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.id", "u.username", "r.role_type as role")
    .where("u.user_id", id)
    .first()
}
