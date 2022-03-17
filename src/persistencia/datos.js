import { modelUsuario } from "./modelos/usuarios.js";
import { modelContenido } from "./modelos/contenidos.js";

async function getUserById(id) {
  const user = await modelUsuario.find({ id });
  return user;
}
async function getAllUsers() {
  const users = await modelUsuario.find();
  console.log("users");
  return users;
}

async function getContentById(id) {
  const user = await modelContenido.find({ id });
  return user;
}
async function getAllcontent() {
  const user = await modelContenido.find();
  return user;
}
async function getUserByEmail(mail) {
  const user = await modelUsuario.find({ mail });
  return user;
}

export {
  getUserById,
  getAllUsers,
  getAllcontent,
  getContentById,
  getUserByEmail
};
