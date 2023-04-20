import Modal from '../Modal'

const LoaderLazy = () => {
  return (
    <Modal animacion={false} cabezera={false} cuerpoClass={'no-padding'} centerClass={'no-border'} center fondoContainer={'#000'} fondo={'#000'}>
      <div className='flex logo'>
        <img src='/logo.ico' alt='logo' />
      </div>
    </Modal>
  )
}

export default LoaderLazy
