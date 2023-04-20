import { useState } from 'react'
import formatearTiempo from '../helpers/formatearTiempo'
import useApp from '../hooks/useApp'
import { LoaderSvg, MessageLeftSvg, MessageRigthSvg } from '../assets/svgs'
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

  if (isReceptor) {
    return (
      <>
        <div className='mensaje--padding'>
          <div className={`mensajeUser mensaje--emitente ${isEliminado ? 'eliminado' : ''}`}>
            <div className='aff'>
              <MessageRigthSvg />
            </div>
            <div className='mensaje__cuerpo'>
              <p className='mensaje__cuerpo__texto'>{mensajeText}</p>
              {foto && <img onClick={handleModalImagen} className='cursor-pointer' src={foto.secure_url} alt='Foto mensaje' onLoad={handleImageLoad} />}
              {foto && loadingImage && (
                <div className='flex w-full padding'>
                  <LoaderSvg />
                </div>
              )}
            </div>
            <p className='mensaje__fecha'>{formatearTiempo(updatedAt)}</p>
          </div>
        </div>

        {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto.secure_url} />}
      </>
    )
  }

  return (
    <>
      <div className='mensaje--padding'>
        <div className={`mensajeUser mensaje--receptor ${isEliminado ? 'eliminado' : ''}`}>
          <div className='aff'>
            <MessageLeftSvg />
          </div>
          <div className='mensaje__cuerpo'>
            <p className='mensaje__cuerpo__texto'>{mensajeText}</p>
            {foto && <img onClick={handleModalImagen} className='cursor-pointer' src={foto.secure_url} alt='Foto mensaje' onLoad={handleImageLoad} />}

            {foto && loadingImage && (
              <div className='flex w-full padding'>
                <LoaderSvg />
              </div>
            )}
          </div>
          <p className='mensaje__fecha'>{formatearTiempo(updatedAt)}</p>
        </div>
      </div>
      {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto.secure_url} />}
    </>
  )
}

export default Mensaje
