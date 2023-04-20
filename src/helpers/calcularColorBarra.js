import hslToRgb from './hslToRgb'

// CALCULAR COLOR BARRA DE PROGRESO
const calcularColorBarra = (porcentaje) => {
  const hue = Math.round((1 - porcentaje / 100) * 120) // mapea el valor de porcentaje a un valor de tono HSL entre 120 (verde) y 0 (rojo)
  const saturation = 100 // constante de saturación
  const luminosity = 50 // constante de luminosidad
  const colorHSL = `hsl(${hue}, ${saturation}%, ${luminosity}%)` // crea el color HSL
  const colorRGB = hslToRgb(colorHSL) // convierte el color HSL a RGB
  return `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})` // devuelve el color RGB
}

export default calcularColorBarra
