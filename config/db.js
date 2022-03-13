import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB Conectado en: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exist(1); //sirve para forzar que el proceso termine en caso de que no se pueda conectar
  }
};
export default conectarDB;
