import { Router } from "express";
import {
  getUserController,
  getAllUserController,
  getContentController,
  getAllContentController
} from "../controlador/datos.js";

const routerDatos = new Router();
routerDatos.get("/users/", getAllUserController);
routerDatos.get("/users/:id", getUserController);
routerDatos.get("/contents", getAllContentController);
routerDatos.get("/contents/:id", getContentController);

export default routerDatos;
