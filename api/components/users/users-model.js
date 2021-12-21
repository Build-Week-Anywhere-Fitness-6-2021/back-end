
const db = require("../../data/db-config")

module.exports = {
  add,
  find,
  findBy,
  findById,
}

// this is mostly boilerplate - i need to go back thru and fix things

// connecting users and roles (which should def be altered) i need to have something for clients
function find() {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.*", 'r.role_type as role')
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "u.username", "r.role_type as role", "u.password")
    .where(filter)
}

async function add(user) {
  const [newUserObj] = await db("users").insert(
     {
        role_id: user.role_id,
        username: user.username,
        email: user.email,
        password: user.password
     }, ['username', 'password', 'email', 'role_id']
   );
  return newUserObj
}

function findById(id) {
  return db("users as u")
    .join("roles as r", "u.role", "=", "r.id")
    .select("u.id", "u.username", "r.name as role")
    .where("u.id", id)
    .first()
}
