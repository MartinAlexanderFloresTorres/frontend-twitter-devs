const generarUsuario = (value) => {
  // quitar espacios
  let nombre = value.split(' ').join('_')
  // quitar acentos
  nombre = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // solo letras y numeros y _ ejem: @jose_123
  nombre = nombre.replace(/[^a-zA-Z0-9_]/g, '')

  // si hay mas de 1 _ seguido, solo 1
  nombre = nombre.replace(/[_]{2,}/g, '_')
  // si empieza o termina con _, quitarlo
  /* nombre = nombre.replace(/^[_]|[_]$/g, '') */

  if (nombre.length > 20) {
    nombre = nombre.slice(0, 20)
  }
  return `@${nombre.toLowerCase()}`
}

export default generarUsuario
