const getMenciones = (value) => {
  return value.filter((word) => {
    // Verifica si la cadena comienza con un símbolo de arroba (@)
    if (word.match(/^@\w{1,20}$/) && word.length > 1) {
      // si su longitud es igual a 2
      return word.split('@').length === 2
    }
    return false
  })
}

export default getMenciones
