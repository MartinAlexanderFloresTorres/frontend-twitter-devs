import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import formaterFecha from '../helpers/formaterFecha'
import TextoConEnlaces from './functions/TextoConEnlaces'
import ModalImagen from './ModalImagen'
import { useState } from 'react'
import { ArrowsPointingOutSvg } from '../assets/svgs'

const ReTweet = ({ tweet }) => {
  // ESTADOS
  const [modalImagen, setModalImagen] = useState(false)

  const { _id, creador, descripcion, foto, menciones, createdAt } = tweet

  // USE NAVIGATE
  const navigate = useNavigate()

  // HANDLE MODAL OPCIONES
  const handleModalImagen = () => setModalImagen(!modalImagen)

  return (
    <div className='tweet--retweet tweet mt-10'>
      <div className='tweet--contenido'>
        <div className='tweet--top'>
          <div className='flex justify-between w-full'>
            <div className='flex'>
              <Avatar user={creador} className='tweet--avatar' />

              <div className='tweet--top--usuario'>
                <div className='flex'>
                  <h2>{creador.nombre}</h2>
                  <span className='tweet--top--usuario--hidden'>•</span>
                  <p className='tweet--top--usuario--hidden'>{formaterFecha(createdAt)}</p>
                </div>
                <Link to={`/user/${creador.usuario}`} className='usuario'>
                  {creador.usuario}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tweet--center tweet--pointer`}
          onClick={(e) => {
            if (e.target && e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SVG' && !e.target.classList.contains('tweet--imagen')) {
              navigate(`/tweet/${_id}`)
            }
          }}
        >
          <TextoConEnlaces value={descripcion} menciones={menciones} />

          {foto && (
            <div className='tweet--imagen' onClick={handleModalImagen}>
              <img src={foto.secure_url} alt={`${creador.nombre}-foto-publicacion`} />
              <div className='tweet--imagen--visualizar flex'>
                <ArrowsPointingOutSvg />
              </div>
            </div>
          )}
        </div>

        <div className='tweet--botones tweet--fecha--visible'>
          <p>{formaterFecha(createdAt)}</p>
        </div>
      </div>

      {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto.secure_url} />}
    </div>
  )
}

export default ReTweet
