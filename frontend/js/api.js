import { calcularAntiguedad, calcularSalario } from "./utils.js";
import { cerrarModales } from "./main.js";

const tablaEmpleados = document.getElementById("cuerpo-tabla-empleados");

window.addEventListener("load", () => {
  cargarEmpleados();
});

// =========== VISUALIZACION ===========

// Insertar empleados en la tabla
function cargarEmpleados() {
  fetch("/empleados")
    .then((response) => response.json())
    .then((empleados) => {
      empleados.forEach((empleado) => {
        const antiguedad = calcularAntiguedad(empleado.fecha_incorporacion);
        tablaEmpleados.innerHTML += `
        <tr>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellidos.primer_apellido}</td>
            <td>${empleado.apellidos.segundo_apellido}</td>
            <td>${empleado.dni}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.fecha_incorporacion}</td>
            <td>${empleado.salario_base}</td>
            <td>${antiguedad}</td>
            <td>${calcularSalario(empleado.salario_base, antiguedad)}</td> 
            <td>
              <button class="btn-accion">Editar</button>
              <button class="btn-accion btn-del">Eliminar</button>
            </td>
        </tr>
        `;
      });
    });
}

// =========== CREAR EMPLEADO ===========
export function crearEmpleado() {
  const empleado = {
    nombre: document.getElementById("nombre").value,
    apellido1: document.getElementById("apellido-1").value,
    apellido2: document.getElementById("apellido-2").value,
    dni: document.getElementById("dni").value,
    puesto: document.getElementById("puesto").value,
    fecha_incorporacion: document.getElementById("fecha-incorporacion").value,
    salario_base: document.getElementById("salario-base").value,
  };

  // Realizar una peticion POST a la API con los datos del empleado

  fetch("/crearEmpleado", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(empleado),
  })
    .then((response) => response.json())
    .then(() => {
      cargarEmpleados();
      cerrarModales();
    });
}
