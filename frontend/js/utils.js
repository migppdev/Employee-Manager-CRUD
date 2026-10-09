export const listaCampos = [
  "nombre",
  "apellido-1",
  "apellido-2",
  "dni",
  "puesto",
  "fecha-incorporacion",
  "salario-base",
];
export const listaCamposEditar = [
  "nombre-editar",
  "apellido-1-editar",
  "apellido-2-editar",
  "dni-editar",
  "puesto-editar",
  "fecha-incorporacion-editar",
  "salario-base-editar",
];

// =========== CALCULAR ANTIGUEDAD ===========
export function calcularAntiguedad(fechaInicio) {
  // Convertir la String fechaInicio a un objeto Date para poder usar los metodos
  const fechaInicioDate = new Date(fechaInicio);

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular primero los años pasados
  let anios = fechaActual.getFullYear() - fechaInicioDate.getFullYear();

  if (
    // Si el mes actual es anterior al de inicio se resta un año, puesto que aún no se cumplió el aniversario este año
    fechaActual.getMonth() < fechaInicioDate.getMonth() ||
    // Si el mes actual es igual al de la fecha de inicio pero el dia actual es anterior al de inicio, se resta un año por el mismo motivo.
    (fechaActual.getMonth() === fechaInicioDate.getMonth() &&
      fechaActual.getDate() < fechaInicioDate.getDate())
  ) {
    anios--;
  }

  return anios;
}

// =========== CALCULAR SALARIO ===========
export function calcularSalario(salarioBase, antiguedad) {
  // 2 a 4 años, incremento salarial del 5%
  if (antiguedad >= 2 && antiguedad <= 4) {
    // redondear a 2 decimales
    return Math.round(salarioBase * 1.05 * 100) / 100;
  }
  // 5 a 9 años, incremento salarial del 10%
  else if (antiguedad >= 5 && antiguedad <= 9) {
    // redondear a 2 decimales
    return Math.round(salarioBase * 1.1 * 100) / 100;
  }
  // 10 o más años, incremento salarial del 15%
  else if (antiguedad >= 10) {
    // redondear a 2 decimales
    return Math.round(salarioBase * 1.15 * 100) / 100;
  }
  // si es inferior a 2, devolver el salario base
  else {
    // redondear a 2 decimales
    return salarioBase;
  }
}

export function limpiarModal() {
  listaCampos.forEach((campo) => {
    document.getElementById(campo).value = "";
  });
}

export function comprobarDNI(dni) {
  // Comprobar DNI
  let regexDNI = /^[0-9]{8}[A-Z]$/;
  return regexDNI.test(dni);
}

export function comprobarNombre(nombre) {
  return /^[a-zA-Z]{2,}$/.test(nombre);
}

// Funcion para obtener los campos erroneos en un empleado
export function obtenerCamposErroneos(empleado, tipoModal) {
  // Crear una array vacia para ir metiendo el id de los campos erroneos
  let camposErroneos = [];

  if (tipoModal === "crear") {
    if (!comprobarDNI(empleado.dni)) {
      camposErroneos.push("dni");
    }
    if (!comprobarNombre(empleado.nombre)) {
      camposErroneos.push("nombre");
    }
    if (!comprobarNombre(empleado.apellido_1)) {
      camposErroneos.push("apellido-1");
    }
    if (!comprobarNombre(empleado.apellido_2)) {
      camposErroneos.push("apellido-2");
    }
  } else if (tipoModal == "editar") {
    if (!comprobarDNI(empleado.dni)) {
      camposErroneos.push("dni-editar");
    }
    if (!comprobarNombre(empleado.nombre)) {
      camposErroneos.push("nombre-editar");
    }
    if (!comprobarNombre(empleado.apellido_1)) {
      camposErroneos.push("apellido-1-editar");
    }
    if (!comprobarNombre(empleado.apellido_2)) {
      camposErroneos.push("apellido-2-editar");
    }
  }
  return camposErroneos;
}

export function marcarCampoError(idCampo) {
  document.getElementById(idCampo).style.borderColor = "red";
  document.getElementById(idCampo).style.borderWidth = "2px";
}

export function limpiarEstiloError(campos) {
  //  Si se pasa una array, recorrer cada campo y quitarle el estilo
  if (Array.isArray(campos)) {
    campos.forEach((campo) => {
      document.getElementById(campo).style.borderColor = "";
      document.getElementById(campo).style.borderWidth = "";
    });
    return;
  }

  // Si no es una array, quitar el estilo una sola vez
  document.getElementById(campos).style.borderColor = "";
  document.getElementById(campos).style.borderWidth = "";
}

let temporizador;

export function notificar(mensaje, tipo) {
  const notificacion = document.getElementById("notificacion");
  const notificacionIcono = document.getElementById("notificacion-icono");
  const notificacionContenido = document.getElementById(
    "notificacion-contenido",
  );

  document.getElementById("notificacion").style.display = "flex";

  notificacionContenido.innerHTML = mensaje;

  if (tipo === "err") {
    notificacionIcono.innerHTML = "X";
  }
  if (tipo === "info") {
    notificacionIcono.innerHTML = "i";
  }

  clearTimeout(temporizador); // Quitar el temporizador

  // Crear el temporizador (2.5s), que ejecutará el cambio de estilo (ocultar la notificacion)
  temporizador = setTimeout(() => {
    notificacion.style.display = "none";
  }, 2500);
}
