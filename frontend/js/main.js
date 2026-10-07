import { eliminarEmpleado } from "./api.js";
import { listaCampos } from "./utils.js";
import { limpiarModal, limpiarEstiloError } from "./utils.js";

const abrirModalCrearBtn = document.querySelector(
  "#abrir-modal-crear-empleado",
);

const cerrarModalBtn = document.querySelector("#cerrar-modal-crear-btn");
const tablaEmpleados = document.querySelector("#cuerpo-tabla-empleados");

abrirModalCrearBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "flex";
});

cerrarModalBtn.addEventListener("click", () => {
  limpiarModal();
  limpiarEstiloError(listaCampos);
  document.getElementById("modal-crear-empleado").style.display = "none";
});

// *============== BOTON EDITAR ==============

// Añadir un trigger cuando se hace click dentro de la tabla
tablaEmpleados.addEventListener("click", (e) => {
  // Guardar en una variable el boton mas cercano a donde se hizo click
  const boton = e.target.closest("button");
  // Si no es un boton, no hacer nada
  if (!boton) return;

  // Si el boton contiene la clase "btn-editar"
  if (boton.classList.contains("btn-editar")) {
    // Llamar a la funcion editarEmpleado pasandole como parametro el id del dataset (data-id)
    editarEmpleado(boton.dataset.id);
  }
});

// *============== BOTON ELIMINAR ==============

// Añadir un trigger cuando se hace click dentro de la tabla
tablaEmpleados.addEventListener("click", (e) => {
  // Guardar en una variable el boton mas cercano a donde se hizo click
  const boton = e.target.closest("button");
  // Si no es un boton, no hacer nada
  if (!boton) return;

  // Si el boton contiene la clase "btn-eliminar"
  if (boton.classList.contains("btn-eliminar")) {
    // Llamar a la funcion eliminarEmpleado pasandole como parametro el id del dataset (data-id)
    eliminarEmpleado(boton.dataset.id);
  }
});
