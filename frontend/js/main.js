import { abrirModalEditar, eliminarEmpleado, crearEmpleado } from "./api.js";
import { listaCampos } from "./utils.js";
import { limpiarModal, limpiarEstiloError } from "./utils.js";

const tablaEmpleados = document.querySelector("#cuerpo-tabla-empleados");

const abrirModalCrearBtn = document.querySelector(
  "#abrir-modal-crear-empleado",
);

abrirModalCrearBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "flex";
});

// Crear una lista de botones que tengan la clase .cerrar-modal-btn
const cerrarModalBtns = document.querySelectorAll(".cerrar-modal-btn");

// Recorrer cada boton en la lista
cerrarModalBtns.forEach((cerrarModalBtn) => {
  // Al hacer click en cualquiera de los botones
  cerrarModalBtn.addEventListener("click", () => {
    // Limpiar los campos
    limpiarModal();
    // Quitar estilos de error
    limpiarEstiloError(listaCampos);
    // Ocultar los modales
    document.getElementById("modal-crear-empleado").style.display = "none";
    document.getElementById("modal-editar-empleado").style.display = "none";
  });
});

// *============== BOTON CREAR EMPLEADO (DENTRO MODAL) ==============
const crearEmpleadoBtn = document.getElementById("crear-empleado-btn");

crearEmpleadoBtn.addEventListener("click", () => {
  crearEmpleado();
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
    abrirModalEditar(boton.dataset.id);
    document.getElementById("modal-editar-empleado").style.display = "flex";
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
