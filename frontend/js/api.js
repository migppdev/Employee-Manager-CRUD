import { calcularAntiguedad, calcularSalario } from "./utils.js";

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
            <td>${empleado.puesto}</td>
            <td>${empleado.fecha_incorporacion}</td>
            <td>${empleado.salario_base}</td>
            <td>${antiguedad}
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
