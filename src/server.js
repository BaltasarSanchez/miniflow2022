import express from "express";
import routerDatos from "./rutas/datos.js";
import mongoose from "mongoose";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { loginUser, getControllerUserByName } from "./controlador/datos.js";
import isAuth from "./middlewares/isAuth.js";
import config from "./config.js";
import logger from "./middlewares/logger.js";

const app = express();
app.use(express.json());
if (config.NODE_ENV == "development") app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:Merluza23@cluster0.vuapg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .catch((error) => console.log(error));
//Configuracion de Login
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:Merluza23@cluster0.vuapg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      mongoOptions: advancedOptions
    }),
    /* ----------------------------------------------------- */

    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000
    }
  })
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const { nombre, email } = req.body;
      //VER ESTA PARTE!!!
      const usuario = { nombre, username, email, password, contador: 0 };
      const resultado = await miUsuarioDAO.addUsuario(usuario);
      //VER ESTA PARTE!!!
      if (!resultado.error) {
        return done(null, usuario);
      } else {
        return done({ error: resultado.error });
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (username, password, done) => {
      console.log("2");
      //VER ESTA PARTE
      /*   if (await miUsuarioDAO.checkPassword(username, password))  */
      if (await loginUser(username, password)) {
        const usuario = await getControllerUserByName(username);
        return done(null, usuario);
      } else {
        return done({ error: "Usuario o contraseña incorrectos" }, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
  //VER ESTA PARTE
  const usuario = await getControllerUserByName(username);
  done(null, usuario);
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/datos", isAuth, routerDatos);

// start server
const PORT = config.PORT || 8000;
const server = app.listen(PORT, () => {
  logger.info(
    `Servidor express escuchando en el puerto ${PORT} (${config.NODE_ENV})`
  );
});
server.on("error", (error) => logger.error(`Error en servidor`, error));
