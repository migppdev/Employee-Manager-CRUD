import {
  calcularAntiguedad,
  calcularSalario,
  cerrarModales,
  obtenerCamposErroneos,
  marcarCampoError,
  limpiarEstiloError,
  notificar,
} from "./utils.js";

import { listaCampos } from "./utils.js";

const tablaEmpleados = document.getElementById("cuerpo-tabla-empleados");

window.notificar = notificar;

window.addEventListener("load", () => {
  cargarEmpleados();
});

// =========== VISUALIZACION ===========

// Insertar empleados en la tabla
function cargarEmpleados() {
  tablaEmpleados.innerHTML = "";
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
              <button class="btn-accion" data-id="${empleado.id}">Editar</button>

              <button class="btn-accion btn-eliminar " data-id="${empleado.id}">Eliminar</button>
              
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

  let camposErroneos = obtenerCamposErroneos(empleado);

  // Comprobar si hay campos erroneos
  if (camposErroneos.length === 0) {
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
        limpiarEstiloError(listaCampos);
        cerrarModales();
        notificar("Empleado creado correctamente", "info");
      });
  } else {
    camposErroneos.forEach((campo) => {
      marcarCampoError(campo);
    });
  }
}

// =========== ELIMINAR EMPLEADO ===========

export const eliminarEmpleado = (idEmpleado) => {
  fetch("/eliminarEmpleado/" + idEmpleado, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      cargarEmpleados();
      notificar("Empleado eliminado correctamente", "info");
    });
};
