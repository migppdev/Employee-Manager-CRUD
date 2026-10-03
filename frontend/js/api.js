import { calcularAntiguedad } from "./utils.js";

const tablaEmpleados = document.getElementById("tabla-empleados");

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
        tablaEmpleados.innerHTML += `
        <tr>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellidos.primer_apellido}</td>
            <td>${empleado.apellidos.segundo_apellido}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.fecha_incorporacion}</td>
            <td>${empleado.salario_base}</td>
            <td>${calcularAntiguedad(empleado.fecha_incorporacion)}
            <td>?</td> 
            <td>ACCIONES</td>
        </tr>
        `;
      });
    });
}
