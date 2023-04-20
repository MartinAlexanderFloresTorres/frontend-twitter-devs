// Utiliza la función "replace()" para eliminar los saltos de línea y dividir el texto en un array
const toArrayWords = (value) => {
  return (
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      /* .replace(/\n/g, ' ') */
      .split(' ')
  )
}

export default toArrayWords
