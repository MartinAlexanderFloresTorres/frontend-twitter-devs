const generarTitulo = ({ pathname }) => {
  const pathSegments = pathname.split('/').filter((segment) => segment !== '') // elimina las barras iniciales y finales y cualquier segmento vacío
  const pageTitle = pathSegments.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(' / ') // capitaliza la primera letra de cada segmento y los une con un separador
  return pageTitle
}

export default generarTitulo
