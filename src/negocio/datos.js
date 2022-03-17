import {
  getUserById,
  getAllUsers,
  getContentById,
  getAllcontent,
  getUserByEmail
} from "../persistencia/datos.js";

async function getUser(id) {
  return await getUserById(id);
}

async function getUserByName(email) {
  try {
    return await getUserByEmail(email);
  } catch (e) {
    throw e.message;
  }
}
async function checkPassword(mail, password) {
  try {
    const [user] = await getUserByEmail(mail);
    if (!user) {
      return false;
    }
    if (user.password == password) {
      return true;
    }
    return false;
  } catch (e) {
    // TODO: MEJORAR MANEJO DE ERRORES
    console.log(e);
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
