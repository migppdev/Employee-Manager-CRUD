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

