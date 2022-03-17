import {
  getUser,
  getUsers,
  getContent,
  getContents,
  checkPassword
} from "../negocio/datos.js";

async function getUserController(req, res) {
  const { id } = req.params;
  console.log(id);
  const datos = await getUser(id);
  res.json(datos);
}
async function getAllUserController(req, res) {
  console.log("2");
  try {
    const datos = await getUsers();
    return res.json(datos);
  } catch (e) {
    console.log(e);
    return res.json({ error: "error" });
  }
}
async function getContentController(req, res) {
  const { id } = req.params;
  console.log(id);
  const datos = await getContent(id);
  res.json(datos);
}
async function getAllContentController(req, res) {
  try {
    const datos = await getContents();
    return res.json(datos);
  } catch (e) {
    console.log(e);
    return res.json({ error: "error" });
  }
}
async function getControllerUserByName(name) {
  try {
    const user = await getUserByName(name);
    if (user) {
      return res.json(user);
    }
    return res.json({ message: "Usuario no encontrado" });
  } catch (e) {
    throw e.message;
  }
}
async function loginUser(username, password) {
  try {
    const logged = await checkPassword(username, password);
    if (!logged) {
      return false;
    }
    return true;
  } catch (e) {
    throw e.message;
  }
}

export {
  getUserController,
  getAllUserController,
  getContentController,
  getAllContentController,
  loginUser,
  getControllerUserByName
};
