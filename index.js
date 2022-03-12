import express  from "express";

const app = express();

app.listen(4000, () => {
    console.log('servidor corriendo en el puerto 4000');
})