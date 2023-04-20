import Modal from './Modal'
import Seguidor from './Seguidor'

const ModalMeEncanta = ({ hearts, handleMeEncanta }) => {
  return (
    <Modal titulo={`${hearts.length} ${hearts.length > 1 ? 'Me encantas' : 'Me encanta'}`} centerClass={'w-700 mx-auto'} maxWidth={'100%'} handleClose={handleMeEncanta} fondo={'rgb(0  0 0 / 76%)'} fondoContainer={'var(--primary-color)'} cuerpoClass={'w-full no-padding'} center>
      <ul className='seguidores'>{hearts.length > 0 ? hearts.map((usuario) => <Seguidor key={usuario._id} seguidor={usuario} />) : <div className='padding'>Se el primero en reaccionar</div>}</ul>
    </Modal>
  )
}

export default ModalMeEncanta
