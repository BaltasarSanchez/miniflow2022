import mongoose from "mongoose";
const { Schema } = mongoose;
const { model } = mongoose;

const usuarioSchema = new Schema({
  id: Number,
  nombre: String,
  apellido: String,
  mail: String,
  password: String,
  telefono: Number,
  direccion: String,
  rol: String,
  avatar: String,
  fecha_nacimiento: Date,
  ContenidosLikeados: [
    {
      idContenido: Number,
      idUsuario: Number,
      fecha: Date,
    },
  ],
  categoria: [
    {
      id: Number,
      nombre: String,
    },
  ],
  comentarios: [
    {
      id: Number,
      idUsuario: Number,
      idContenido: Number,
      fecha: Date,
      comentarioTexto: String,
    },
  ],
});

const modelUsuario = new model("usuarios", usuarioSchema);
export { modelUsuario };
