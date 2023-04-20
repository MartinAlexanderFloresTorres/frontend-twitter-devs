import { Link } from 'react-router-dom'

const Autorizacion = () => {
  return (
    <div className='autorizacion'>
      <Link to='/registro' className='btn btn--2 autorizacion__enlace'>
        Regístrate
      </Link>

      <Link to='/login' className='btn btn--primary autorizacion__enlace'>
        Inicia sesión
      </Link>
    </div>
  )
}

export default Autorizacion
