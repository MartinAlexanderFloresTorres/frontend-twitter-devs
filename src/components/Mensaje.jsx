import { useState } from 'react'
import formatearTiempo from '../helpers/formatearTiempo'
import useApp from '../hooks/useApp'
import { LoaderSvg, MessageLeftSvg, MessageRigthSvg, MessageVistoSvg } from '../assets/svgs'
import ModalImagen from './ModalImagen'

const Mensaje = ({ mensaje, setImageCount }) => {
  // ESTADOS
  const [loadingImage, setLoadingImage] = useState(true)
  const [modalImagen, setModalImagen] = useState(false)

  const { mensaje: mensajeText, foto, emisor, updatedAt } = mensaje

  // USE APP
  const { user } = useApp()

  const isReceptor = emisor._id === user._id

  const isEliminado = mensajeText.includes('elimino su conversación')

  const handleImageLoad = () => {
    setLoadingImage(false)
    setImageCount((prev) => prev + 1)
  }

  // HANDLE MODAL OPCIONES
  const handleModalImagen = () => {
    setModalImagen(!modalImagen)
  }

  return (
    <>
      <div className={`mensajeUser ${isReceptor ? 'rigth' : 'left'} ${isEliminado ? 'mensajeUser--eliminado' : ''}`}>
        <span className={`aff`}>{!isReceptor ? <MessageLeftSvg /> : <MessageRigthSvg />}</span>

        {isReceptor ? (
          <span className='sms'>
            <span className='sms_text'>
              {mensajeText}
              {foto && <img onClick={handleModalImagen} className='cursor-pointer' src={foto.secure_url} alt='Foto mensaje' onLoad={handleImageLoad} />}
              {foto && loadingImage && (
                <div className='flex w-full padding'>
                  <LoaderSvg />
                </div>
              )}
            </span>
            <span className='sms_time'>{formatearTiempo(updatedAt)}</span>
            <span>
              <MessageVistoSvg />
            </span>
          </span>
        ) : (
          <span className='sms'>
            <span className='sms'>
              <span className='sms_text'>
                {mensajeText}

                {foto && <img onClick={handleModalImagen} className='cursor-pointer' src={foto.secure_url} alt='Foto mensaje' onLoad={handleImageLoad} />}
                {foto && loadingImage && (
                  <div className='flex w-full padding'>
                    <LoaderSvg />
                  </div>
                )}
              </span>

              <span className='sms_time'>{formatearTiempo(updatedAt)}</span>
            </span>
          </span>
        )}
      </div>

      {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto.secure_url} />}
    </>
  )
}

export default Mensaje
