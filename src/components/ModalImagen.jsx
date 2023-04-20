import React, { useState } from 'react'
import Modal from './Modal'
import { LoaderSvg } from '../assets/svgs'

const ModalImagen = ({ handleModal, url }) => {
  // USE STATE
  const [loadingImage, setLoadingImage] = useState(true)

  const handleImageLoad = () => {
    setLoadingImage(false)
  }
  return (
    <Modal fondo={'rgb(0 0 0 / 73%)'} cabezera={false} center centerClass={'w-fit mx-auto modal--imagen'} maxWidth={'100%'} handleClose={handleModal} cuerpoClass={'no-padding'} fondoContainer={'transparent'}>
      <img src={url} alt='Imagen' onLoad={handleImageLoad} />

      {loadingImage && (
        <div className='flex w-full padding'>
          <LoaderSvg />
        </div>
      )}
    </Modal>
  )
}

export default ModalImagen
