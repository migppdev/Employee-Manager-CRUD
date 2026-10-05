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

// =========== CREAR EMPLEADO ===========
app.post("/crearEmpleado", (req, res) => {
  // Guardar la ruta del archivo
  const archivo = "./database.json";

  // Obtener los datos del archivo
  const datos = fs.readFileSync("./database.json");

  // Guardar en una variable empleados los datos en JSON
  const empleados = JSON.parse(datos);

  // Crear un objeto empleado con los datos de la request
  const empleado = {
    id: empleados.length + 1,
    nombre: req.body.nombre,
    apellidos: {
      primer_apellido: req.body.apellido1,
      segundo_apellido: req.body.apellido2,
    },
    dni: req.body.dni,
    puesto: req.body.puesto,
    fecha_incorporacion: req.body.fecha_incorporacion,
    salario_base: req.body.salario_base,
  };

  // Guardar el nuevo empleado en la lista de empleados
  empleados.push(empleado);

  // Escribir los empleados nuevamente
  fs.writeFileSync(archivo, JSON.stringify(empleados, null, 4));

  res.json(empleado);
});

app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:" + PORT);
});
