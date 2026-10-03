const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.static("frontend"));
app.use(express.json());

const fs = require("fs");
const archivo = "./database.json";

app.get("/", (req, res) => {
  res.send("Bienvenido al panel de Recursos Humanos");
});

// =========== DEVOLVER EMPLEADOS  ===========
app.get("/empleados", (req, res) => {
  const archivo = fs.readFileSync("./database.json");
  const datos = JSON.parse(archivo);

  res.json(datos);
});

app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:" + PORT);
});
