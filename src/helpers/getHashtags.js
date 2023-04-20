// HASHTAGAS
const getHashtags = (value) => {
  return value.filter((word) => {
    // Verifica si la cadena comienza con un símbolo de almohadilla (#)
    if (word.match(/^#[a-zA-Z0-9_]+$/) && word.length > 1) {
      // si su longitud es igual a 2
      return word.split('#').length === 2
    }
    return false
  })
}

export default getHashtags
