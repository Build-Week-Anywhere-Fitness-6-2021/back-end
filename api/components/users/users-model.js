const db = require("../../data/db-config")

module.exports = {
  add,
  find,
  findBy,
  findById,
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
    .join("roles as r", "u.role", "=", "r.id")
    .select("u.id", "u.username", "r.name as role")
    .where("u.id", id)
    .first()
}
