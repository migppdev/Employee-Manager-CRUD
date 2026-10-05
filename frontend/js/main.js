import { crearEmpleado } from "./api.js";
import { listaCampos } from "./utils.js";
import { limpiarModal, limpiarEstiloError } from "./utils.js";
const abrirModalBtn = document.querySelector("#abrir-modal-crear-empleado");
const cerrarModalBtn = document.querySelector("#cerrar-modal-crear-btn");
const crearEmpleadoBtn = document.querySelector("#crear-empleado-btn");

abrirModalBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "flex";
});

cerrarModalBtn.addEventListener("click", () => {
  limpiarModal();
  limpiarEstiloError(listaCampos);
  document.getElementById("modal-crear-empleado").style.display = "none";
});

crearEmpleadoBtn.addEventListener("click", () => {
  crearEmpleado();
});
