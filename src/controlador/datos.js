import {
  getUser,
  getUsers,
  getContent,
  getContents,
  checkPassword,
  getUserByName
} from "../negocio/datos.js";

async function getUserController(req, res) {
  const { id } = req.params;

  const datos = await getUser(id);
  res.json(datos);
}
async function getAllUserController(req, res) {
  try {
    const datos = await getUsers();
    return res.json(datos);
  } catch (e) {
    return res.json({ error: "error" });
  }
}
async function getContentController(req, res) {
  const { id } = req.params;

  const datos = await getContent(id);
  res.json(datos);
}
async function getAllContentController(req, res) {
  try {
    const datos = await getContents();
    return res.json(datos);
  } catch (e) {
    return res.json({ error: "error" });
  }
}

//TODO : NO ES UN CONTROLADOR, MOVER
async function getControllerUserByName(mail) {
  try {
    const [user] = await getUserByName(mail);
    if (user) {
      return user;
    }
    return null;
  } catch (e) {}
}
async function loginUser(email, password) {
  try {
    const logged = await checkPassword(email, password);

    if (!logged) {
      return false;
    }
    return true;
  } catch (e) {}
}

export {
  getUserController,
  getAllUserController,
  getContentController,
  getAllContentController,
  loginUser,
  getControllerUserByName
};
