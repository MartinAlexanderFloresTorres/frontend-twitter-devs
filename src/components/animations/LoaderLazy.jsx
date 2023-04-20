import React from 'react'
import Modal from '../Modal'

const LoaderLazy = () => {
  return (
    <Modal cabezera={false} cuerpoClass={'no-padding'} centerClass={'no-border'} center fondoContainer={'#000'} fondo={'#000'}>
      <div className='flex'>
        <img src='/logo.ico' alt='Logo' />
        <h2>Devs</h2>
      </div>
    </Modal>
  )
}

export default LoaderLazy
