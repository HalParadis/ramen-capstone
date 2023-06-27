const client = require('../client')

const createUserItem = async ({userId, ramenId, count}) =>{
 try{
    const {rows: [userItem]} = await client.query(`
    INSERT INTO users_items ("userId" , "ramenId", count)
    VALUES($1, $2, $3)
    ON CONFLICT ("userId", "ramenId") DO NOTHING
    RETURNING *;
    `, [userId, ramenId, count])
    return userItem;
 } catch(error){
    console.error(error)
 }
}

const getUsersItemsByUsersId = async ( id ) => {
  try{ 
    const {rows: [userItem]} = await client.query(`
      SELECT * 
      FROM users_item
    `, [id])
    return userItem;
  } catch(error){
    console.error(error)
  }
}



module.exports = {
    createUserItem,
    getUsersItemsByUsersId
}