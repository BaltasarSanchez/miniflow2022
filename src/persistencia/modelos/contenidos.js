import mongoose from "mongoose";
const { Schema } = mongoose;
const { model } = mongoose;

const contenidoSchema = new Schema({
  id: Number,
  title: String,
  descripcion: String,
  url: String,
  duracion: Number,
  edadMinima: Number,
  contenidoLive: Boolean,
  imagenPosterVertical: String,
  imagenPosterHorizontal: String,
  cantidadLikes: {
    type: Number,
    default: 0,
  },
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

const modelContenido = new model("contenidos", contenidoSchema);
export { modelContenido };
