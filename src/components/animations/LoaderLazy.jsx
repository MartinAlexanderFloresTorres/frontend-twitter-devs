import { LogoSvg } from '../../assets/svgs'
import Modal from '../Modal'

const LoaderLazy = () => {
  return (
    <Modal animacion={false} cabezera={false} cuerpoClass={'no-padding'} centerClass={'no-border'} center fondoContainer={'#000'} fondo={'#000'}>
      <div className='flex logo'>
        <LogoSvg />
        <h2>DEVS</h2>
      </div>
    </Modal>
  )
}

export default LoaderLazy
