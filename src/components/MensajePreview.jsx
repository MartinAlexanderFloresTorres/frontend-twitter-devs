import { Link } from 'react-router-dom'
import useApp from '../hooks/useApp'
import Avatar from './Avatar'
import formatearTiempo from '../helpers/formatearTiempo'
import { FotoSvg } from '../assets/svgs'

const MensajePreview = ({ mensaje }) => {
  const { _id, miembros, updatedAt, bloqueado } = mensaje

  // USE APP
  const { user } = useApp()

  const notUser = miembros.find((m) => m._id !== user._id)
  const isUser = miembros.find((m) => m._id == user._id)

  return (
    <div className='mensaje mensaje--preview'>
      <div className='mensaje__cabezera flex justify-between'>
        <div className='flex w-full'>
          <Avatar user={notUser} />

          <Link className='mensaje__cabezera__item' to={`/conversacion/${_id}/mensajes/${isUser._id}/${notUser._id}`}>
            <div className='mensaje__cabezera__info mensaje__cabezera__info--marginBottom'>
              <h3 className='mensaje__cabezera__info__nombre webkit-box-1'>{notUser.nombre}</h3>
            </div>

            <div className='mensaje__cuerpo'>
              <div className={`flex w-fit mensaje__cuerpo__texto ${mensaje.ultimoMensaje.texto.includes('elimino su conversación') ? 'eliminado' : ''}`}>
                <span className={'mensaje__cuerpo__texto--preview webkit-box-1'}>
                  {mensaje.ultimoMensaje.usuarioId === isUser._id && <span className='mensaje__cuerpo__texto--tu'>Tu: </span>}
                  {mensaje.ultimoMensaje.texto !== '' && mensaje.ultimoMensaje.texto}
                </span>
                {mensaje.ultimoMensaje.isfoto && (
                  <div className='flex mensaje__cuerpo__texto--imagen'>
                    <FotoSvg />
                    Foto
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>

        <p className='mensaje__cabezera__info__fecha'>{formatearTiempo(updatedAt)}</p>
      </div>
    </div>
  )
}

export default MensajePreview
