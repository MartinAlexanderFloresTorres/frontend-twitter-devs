const Indicador = ({ longitud, children }) => {
  return (
    <div className='indicador'>
      {longitud > 0 && <b className='indicador--length'>{longitud < 100 ? longitud : '+99'}</b>}

      {children}
    </div>
  )
}

export default Indicador
