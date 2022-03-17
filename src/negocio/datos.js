import {
  getUserById,
  getAllUsers,
  getContentById,
  getAllcontent
} from "../persistencia/datos.js";

async function getUser(id) {
  return await getUserById(id);
}

async function getUserByName(username) {
  try {
    return await getUserById({ username });
  } catch (e) {
    throw e.message;
  }
}
async function checkPassword(username, password) {
  try {
    const user = await getUserByName(username);
    if (!user) {
      return false;
    }
    if (user.password == password) {
      return true;
    }
    return false;
  } catch (e) {
    throw e.message;
  }
}
async function getUsers() {
  return await getAllUsers();
}
async function getContent(id) {
  return await getContentById(id);
}

async function getContents() {
  return await getAllcontent();
}

export {
  getUser,
  getUsers,
  getContents,
  getContent,
  checkPassword,
  getUserByName
};
