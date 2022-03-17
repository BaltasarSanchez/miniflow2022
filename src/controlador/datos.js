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

//TODO : NO ES UN CONTROLADOR, MOVER
async function getControllerUserByName(mail) {
  try {
    const [user] = await getUserByName(mail);
    if (user) {
      return user;
    }
    return null;
  } catch (e) {
    console.log(e.message);
  }
}
async function loginUser(email, password) {
  try {
    const logged = await checkPassword(email, password);
    console.log(logged);
    if (!logged) {
      return false;
    }
    return true;
  } catch (e) {
    console.log("error");
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
