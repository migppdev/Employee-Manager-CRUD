import {
  calcularAntiguedad,
  calcularSalario,
  obtenerCamposErroneos,
  marcarCampoError,
  limpiarEstiloError,
  notificar,
} from "./utils.js";

import { listaCampos, listaCamposEditar } from "./utils.js";

const tablaEmpleados = document.getElementById("cuerpo-tabla-empleados");

window.addEventListener("load", () => {
  cargarEmpleados();
});

// =========== OBTENER EMPLEADO POR ID ===========
export function obtenerEmpleadoPorId(idEmpleado) {
  return fetch("/empleados/" + idEmpleado).then((response) => response.json());
}

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
            <td>${empleado.apellidos.apellido_1}</td>
            <td>${empleado.apellidos.apellido_2}</td>
            <td>${empleado.dni}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.fecha_incorporacion}</td>
            <td>${empleado.salario_base}</td>
            <td>${antiguedad}</td>
            <td>${calcularSalario(empleado.salario_base, antiguedad)}</td> 
            <td>
              <button class="btn-accion btn-editar" data-id="${empleado.id}">Editar</button>

              <button class="btn-accion btn-eliminar" data-id="${empleado.id}">Eliminar</button>
              
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
    apellido_1: document.getElementById("apellido-1").value,
    apellido_2: document.getElementById("apellido-2").value,
    dni: document.getElementById("dni").value,
    puesto: document.getElementById("puesto").value,
    fecha_incorporacion: document.getElementById("fecha-incorporacion").value,
    salario_base: document.getElementById("salario-base").value,
  };

  let camposErroneos = obtenerCamposErroneos(empleado, "crear");

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
        notificar("Empleado creado correctamente", "info");
      });
  } else {
    camposErroneos.forEach((campo) => {
      marcarCampoError(campo);
    });
  }
}

// =========== EDITAR EMPLEADO ===========
export const abrirModalEditar = (idEmpleado) => {
  // Cargar datos del empleado en el formulario
  fetch("/empleados/")
    .then((response) => response.json())
    .then((empleados) => {
      // Busco en la lista de empleados el empleado con ID = parámetro
      const empleado = empleados.find((empleado) => empleado.id == idEmpleado);

      //	Cargar en el formulario los datos del empleado
      document.getElementById("id-editar").value = empleado.id;
      document.getElementById("nombre-editar").value = empleado.nombre;
      document.getElementById("apellido-1-editar").value =
        empleado.apellidos.apellido_1;
      document.getElementById("apellido-2-editar").value =
        empleado.apellidos.apellido_2;
      document.getElementById("dni-editar").value = empleado.dni;
      document.getElementById("puesto-editar").value = empleado.puesto;
      document.getElementById("fecha-incorporacion-editar").value =
        empleado.fecha_incorporacion;
      document.getElementById("salario-base-editar").value =
        empleado.salario_base;
    });
};

export const editarEmpleado = () => {
  const empleadoEditar = {
    id: document.getElementById("id-editar").value,
    nombre: document.getElementById("nombre-editar").value,
    apellido_1: document.getElementById("apellido-1-editar").value,
    apellido_2: document.getElementById("apellido-2-editar").value,
    dni: document.getElementById("dni-editar").value,
    puesto: document.getElementById("puesto-editar").value,
    fecha_incorporacion: document.getElementById("fecha-incorporacion-editar")
      .value,
    salario_base: document.getElementById("salario-base-editar").value,
  };

  let camposErroneos = obtenerCamposErroneos(empleadoEditar, "editar");

  if (camposErroneos.length === 0) {
    console.log(empleadoEditar);
    fetch("/editarEmpleado/" + empleadoEditar.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleadoEditar),
    })
      .then((response) => response.json())
      .then(
        cargarEmpleados(),
        limpiarEstiloError(listaCamposEditar),
        notificar("Empleado editado correctamente", "info"),
      );
  } else {
    camposErroneos.forEach((campo) => {
      marcarCampoError(campo);
    });
  }
};

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

// =========== GENERAR NOMINAS ===========
export const generarNominas = () => {
  fetch("/generarNominas/")
    // Guardar la respuesta como un blob (Binary Large Object)
    .then((response) => response.blob())
    .then((blob) => {
      // Simular el clic en un elemento <a> que tiene el atributo download y una url para este blob
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "nominas.txt";
      a.click();
    });
};
