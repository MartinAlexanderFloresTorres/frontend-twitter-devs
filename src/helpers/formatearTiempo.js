const formatearTiempo = (tiempo) => {
  const date = new Date(tiempo)
  const horas = date.getHours()
  const minutos = date.getMinutes()
  const horasFormateadas = horas % 12 === 0 ? 12 : horas % 12 // Convierte la hora en formato de 12 horas
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos // Añade un cero delante de los minutos si es necesario
  const periodo = horas < 12 ? 'AM' : 'PM' // Determina si es AM o PM
  return `${horasFormateadas}:${minutosFormateados} ${periodo}`
}

export default formatearTiempo
