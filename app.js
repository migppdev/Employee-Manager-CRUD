const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.static("frontend"));
app.use(express.json());

const fs = require("fs");

// =========== DEVOLVER EMPLEADOS  ===========
app.get("/empleados", (req, res) => {
  const archivo = fs.readFileSync("./database.json");
  const datos = JSON.parse(archivo);

  res.json(datos);
});

// =========== CREAR EMPLEADO ===========
app.post("/crearEmpleado", (req, res) => {
  console.log("Entra en api crear empleado");
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
      apellido_1: req.body.apellido_1,
      apellido_2: req.body.apellido_2,
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

// =========== EDITAR EMPLEADO ===========
app.put("/editarEmpleado/:id", (req, res) => {
  const archivo = "./database.json";
  const datos = fs.readFileSync(archivo);

  let empleados = JSON.parse(datos);

  // Guardar el indice del empleado a editar
  const indiceEmpleadoEditar = empleados.findIndex(
    (empleado) => empleado.id == req.params.id,
  );

  // Modificar los datos del empleado a editar en el array de empleados
  empleados[indiceEmpleadoEditar].nombre = req.body.nombre;
  empleados[indiceEmpleadoEditar].apellidos.apellido_1 = req.body.apellido_1;
  empleados[indiceEmpleadoEditar].apellidos.apellido_2 = req.body.apellido_2;
  empleados[indiceEmpleadoEditar].dni = req.body.dni;
  empleados[indiceEmpleadoEditar].puesto = req.body.puesto;
  empleados[indiceEmpleadoEditar].fecha_incorporacion =
    req.body.fecha_incorporacion;
  empleados[indiceEmpleadoEditar].salario_base = req.body.salario_base;

  // Escribir nuevamente en el archivo la lista de empleados
  fs.writeFileSync(archivo, JSON.stringify(empleados, null, 4));

  // Devolver como respuesta el empleado con sus datos nuevos
  res.json(empleados[indiceEmpleadoEditar]);
});

// =========== ELIMINAR EMPLEADO ===========
app.delete("/eliminarEmpleado/:id", (req, res) => {
  const archivo = "./database.json";
  const datos = fs.readFileSync(archivo);

  // Guardar los empleados actuales en un array
  let empleados = JSON.parse(datos);

  const empleadosNuevos = empleados.filter(
    (empleado) => empleado.id != req.params.id,
  );

  // Escribir de nuevo los empleados ya filtrados
  fs.writeFileSync(archivo, JSON.stringify(empleadosNuevos, null, 4));

  res.json(empleadosNuevos);
});

app.listen(PORT, () => {
  console.log("Servidor iniciado en http://localhost:" + PORT);
});
