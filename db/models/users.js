// grab our db client connection to use with our adapters
const client = require('../client');

const createUser = async ({username, password, email, address}) => {
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users (username, password, email, address)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT DO NOTHING
      RETURNING *;
    `, [username, password, email, address]);
    //console.log('createUser user:', user);
    user && delete user.password;
    return user;
  }
  catch (err) {
    console.error(err);
  }
}

const getAllUsers = async () => {

}

const getUserByUsername = async () => {

}
 
module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserByUsername,

};