import { crearEmpleado } from "./api.js";

const abrirModalBtn = document.querySelector("#abrir-modal-crear-empleado");
const cerrarModalBtn = document.querySelector("#cerrar-modal-crear-btn");
const crearEmpleadoBtn = document.querySelector("#crear-empleado-btn");

export function cerrarModales() {
  document.getElementById("modal-crear-empleado").style.display = "none";
}

abrirModalBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "flex";
});

cerrarModalBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "none";
});

crearEmpleadoBtn.addEventListener("click", () => {
  crearEmpleado();
});
