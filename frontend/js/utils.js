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
