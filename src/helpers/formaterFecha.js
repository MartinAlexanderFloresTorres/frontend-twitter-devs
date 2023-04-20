const formaterFecha = (fecha) => {
  let date
  if (fecha.includes('T00:00:00.000Z')) {
    date = new Date(fecha.split('T')[0].split('-'))
  } else {
    date = new Date(fecha)
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('es-ES', options)
  const fechaFormatoMayuscula = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  return fechaFormatoMayuscula.replace(',', ' del')
}

export default formaterFecha
