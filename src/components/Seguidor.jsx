import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import BotonSeguimiento from './botonSeguimiento'
import useApp from '../hooks/useApp'

const Seguidor = ({ seguidor }) => {
  const { _id, nombre, usuario } = seguidor

  // USE APP
  const { user } = useApp()

  return (
    <li className='seguidores__item'>
      <div className='seguidores__item--avatar'>
        <Avatar user={seguidor} />
      </div>

      <div className='seguidores__datos'>
        <p className='nombre'>{nombre}</p>
        <Link to={`/user/${usuario}`} className='usuario'>
          {usuario}
        </Link>
      </div>

      {user?.usuario !== usuario && <BotonSeguimiento id={_id} />}
    </li>
  )
}

export default Seguidor
