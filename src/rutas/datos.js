import { Router } from "express";
import {
  getUserController,
  getAllUserController,
  getContentController,
  getAllContentController
} from "../controlador/datos.js";

import isAuth from "../middlewares/Auth.js";

const routerDatos = new Router();
routerDatos.get("/users/", getAllUserController);
routerDatos.get("/users/:id", isAuth, getUserController);
routerDatos.get("/contents", getAllContentController);
routerDatos.get("/contents/:id", getContentController);

export default routerDatos;
