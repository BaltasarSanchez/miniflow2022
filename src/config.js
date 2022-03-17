// config.js
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV || 'development' + '.env')
});

console.log("Mongo URL:" + process.env.MONGO_URL)
console.log("Ruta Archivo Configuracion:" + path.resolve(process.cwd(), process.env.NODE_ENV || 'development' + '.env'))

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,
}