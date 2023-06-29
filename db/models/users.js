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
    user && delete user.password;
    return user;
  }
  catch (err) {
    console.error(err);
  }
};

const getAllUsers = async () => {
  try {
    const { rows: users } = await client.query(`
    SELECT *
    FROM users
    `);
    return users;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (id) => {
  try {
    const {rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE id=${id}
    `);
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsername = async (username) => {
  try {
    const {rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1;
    `, [username]);
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByUsernameAndPassword = async ({ username, password }) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    delete user.password;
    return user;
  } else {
    throw new Error("Password is Incorrect");
  }
};

const updateUser = async ({ id, ...fields }) => {
  const password = fields.password
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    const {rows: [user]} = await client.query(`
     UPDATE users
     SET ${setString}
     WHERE id=${id}
     RETURNING *;
     `, Object.values(fields));

     if(password){
      const SALT_COUNT = 5;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
     const {rows: [user]} = await client.query(`
     UPDATE users
     SET password=$1
     WHERE id=$2
     RETURNING *;
     `,[hashedPassword, id]);
     }
     console.log(user.password)
    return user;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const {rows: [user]} = await client.query(`
  DELETE FROM users
  WHERE id=${id}
  RETURNING *;
  `);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  // add your database adapter fns here
  createUser,
};