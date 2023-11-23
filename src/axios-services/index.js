import axios from "axios";
// const BASE_URI = process.env.API_BASE_URI ?? "";

const BASE_URI = 'https://we-love-ramen-z99y.onrender.com';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get(`${BASE_URI}/api/users')`      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAllRamenFromAPI() {
  try {
    console.log(BASE_URI);
    const { data: ramen } = await axios.get(`${BASE_URI}/api/ramen`);
    return ramen;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getAllUsersFromAPI() {
  try{
    const { data: users } = await axios.get(`${BASE_URI}/api/users`);
    return users;
  } catch(err) {
    console.error(err)
  }
}

export async function getRamenByIdFromAPI(id) {
  try {
    const { data: ramen } = await axios.get(`${BASE_URI}/api/ramen/${id}`);
    return ramen;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getAdminRamenByIdFromAPI(id) {
  try {
    const { data: ramen } = await axios.get(`${BASE_URI}/api/ramen/${id}`);
    return ramen;
  } catch (err) {
    console.error(err);
  }
}

export async function updateRamenFromAPI({id, token, ...body}) {
  try {
    const headers = { 
      'Authorization': `Bearer ${token}`
  };
    const { data: ramen } = await axios.patch(`${BASE_URI}/api/ramen/update/${id}`, {...body} ,  {headers})  
    return ramen;
  } catch (error){
    console.error(error)
  }
}

export function deleteRamenFromAPI({id, token}) {
  try {
    const headers = { 
      'Authorization': `Bearer ${token}`
  };
    const { data: ramen } = axios.delete(`${BASE_URI}/api/ramen/delete/${id}`, { headers })
    return ramen;
  } catch (error){
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export function createRamenFromAPI({ token, ...body}) {
  try {
    const headers = { 
      'Authorization': `Bearer ${token}`
  };
    const { data: ramen } = axios.post(`${BASE_URI}/api/ramen/create`,{...body}, { headers })
    return ramen;
  } catch (error){
    console.error(error)
  }
}

export async function loginAPI({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URI}/api/users/login`, {
      username,
      password
    });
    return data;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function registerAPI({ username, password, email, address }) {
  try {
    const { data } = await axios.post(`${BASE_URI}/api/users/register`, {
      username,
      password,
      email,
      address
    });
    return data;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUserByIdAPI({userId, token}) {
  try {
    const { data } = await axios.get(
      `${BASE_URI}/api/users/${userId}`, 
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data;
  }
  catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function patchUserAPI({userId, token, ...bodyData}) {
  try {
    const { data } = await axios.patch(
      `${BASE_URI}/api/users/${userId}`, 
      {...bodyData},
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data;
  }
  catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function deleteUserAPI({userId, token}) {
  try { 
    const { data } = await axios.delete(
      `${BASE_URI}/api/users/${userId}`, 
      {headers: { Authorization: `Bearer ${token}` }}
    );
    return data;  
  }
  catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUsersItemsByUserIdAPI({userId, token}) {
  try {
    const { data: usersItems } = await axios.get(
      `${BASE_URI}/api/users_items/${userId}`,
      {headers: { Authorization: `Bearer ${token}` }}
      );
    return usersItems;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUsersItemsByRamenIdAPI({id, token}) {
  try{
    const {data: usersItems} = await axios.get(`${BASE_URI}/api/users_items/ramen/${id}`, {headers: { Authorization: `Bearer ${token}` }})
    return usersItems;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function patchUserItemAPI({userItemId, token, ...bodyData}) {
  try {
    const { data: updateCount } = await axios.patch(
      `${BASE_URI}/api/users_items/${userItemId}`, 
      {...bodyData},
      {headers: { Authorization: `Bearer ${token}` }}
      );
    return updateCount;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function deleteUserItemAPI({userItemId, token}) {
  try {
    const { data: deleteData } = await axios.delete(
      `${BASE_URI}/api/users_items/${userItemId}`,
      {headers: { Authorization: `Bearer ${token}` }}
      );
    return deleteData;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function postUserItemAPI({ramenId, count, token}) {
  try {
    const { data: newUserItem } = await axios.post(
      `${BASE_URI}/api/users_items/${ramenId}`,
      { count },
      {headers: { Authorization: `Bearer ${token}` }}
      );
    return newUserItem;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}

export async function getUserByIdFromAPI({id, token}) {
  try {
    const { data: user} = await axios.get(
      `${BASE_URI}/api/users/${id}`,
      {headers: { Authorization: `Bearer ${token}` }}
      );
    return user;
  } catch (error) {
    console.error(error?.response?.data);
    return error?.response?.data;
  }
}


export async function getAPIHealth() {
  try {
    const { data } = await axios.get(`${BASE_URI}/api/health`);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
