const abrirModalBtn = document.querySelector("#abrir-modal-crear-empleado");
const cerrarModalBtn = document.querySelector("#cerrar-modal-crear-btn");

abrirModalBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "flex";
});

cerrarModalBtn.addEventListener("click", () => {
  document.getElementById("modal-crear-empleado").style.display = "none";
});
