import { Link } from 'react-router-dom'
import useApp from '../hooks/useApp'

const Avatar = ({ user = {}, ...props }) => {
  const { avatar, usuario, nombre, _id, historias } = user

  // USE APP
  const { conectados } = useApp()

  // SI EL _ID DE USUARIO SE ENCUENTRA EN EL ARRAY DE USUARIOS SIGNIFICA QUE ESTA ACTIVO
  const activo = conectados.find((u) => u.usuarioId === _id) ? true : false

  return (
    <Link to={`/user/${usuario}`} className='avatar'>
      <img {...props} src={avatar?.secure_url} alt={`${nombre}-avatar`} />
      {activo && <span className='avatar__estado avatar__estado--online'></span>}
    </Link>
  )
}

export default Avatar
