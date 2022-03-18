import express from "express";
import routerDatos from "./rutas/datos.js";
import mongoose from "mongoose";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import isAuth from "./middlewares/Auth.js";
import CorsHeaders from "./middlewares/CorsHeaders.js";

//TODO Preguntar al Lider técnico si esto esta bien.
import { loginUser, getControllerUserByName } from "./controlador/datos.js";

import config from "./config.js";
import logger from "./middlewares/logger.js";

const app = express();

//utf8 characters
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

var corsOptions = {
  origin: ['http://example.com', 'http://localhost:3000'],
  credentials: true,
  exposedHeaders: ["set-cookie"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions));
//app.use(CorsHeaders);

app.use(express.static('src/public'));



https://miniflow2022.herokuapp.com/auth/login
//Configuracion de LOGIN Y SESSION
mongoose
  .connect(
    "mongodb+srv://admin:Merluza23@cluster0.vuapg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .catch((error) => console.log(error));

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
      //VER ESTA PARTE
      /*   if (await miUsuarioDAO.checkPassword(username, password))  */
      if (await loginUser(username, password)) {
        const usuario = await getControllerUserByName(username);
        return done(null, usuario.mail);
      } else {
        return done(
          /* { error: "Usuario o contraseña incorrectos" } */ null,
          false
        );
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (username, done) {
  //VER ESTA PARTE
  const usuario = await getControllerUserByName(username);
  done(null, usuario);
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/login', function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send(401, { 'status': 401, 'message': 'Credenciales Invalidas' });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.send({ 'status': 200, 'message': 'Usuario Autenticado.', 'user': req.user });
    });
  })(req, res, next);
});

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.send({ 'status': 200, 'message': 'Usuario Deslogueado', 'user': req.user });
});
//FIN LOGIN Y SESSION


app.use("/api", isAuth, routerDatos);
app.use("/insecure/api", routerDatos);



// start server
const PORT = config.PORT || 8081;
const server = app.listen(PORT, () => {
  logger.info(
    `Servidor express escuchando en el puerto ${PORT} (${config.NODE_ENV})`
  );
});
server.on("error", (error) => logger.error(`Error en servidor`, error));
