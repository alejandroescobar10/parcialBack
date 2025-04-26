const app = require("./app");
const mongoose = require("mongoose");

const PORT = 4000;
const MONGO_URI ='mongodb+srv://alejoesmo:edwardjunior@cluster0.ovtdg3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🟢 Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));
