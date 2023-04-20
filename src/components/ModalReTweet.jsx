import Modal from './Modal'
import FormularioReTweet from './FormularioReTweet'

const ModalReTweet = ({ tweet, handleModalRetweet }) => {
  return (
    <Modal titulo={`ReTuitear a (${tweet.creador.usuario})`} centerClass={'w-600 mx-auto'} maxWidth={'100%'} handleClose={handleModalRetweet} fondo={'rgb(0 0 0 / 76%)'} fondoContainer={'var(--primary-color)'} cuerpoClass={'w-full no-padding'} center>
      <FormularioReTweet tweet={tweet} handleModalRetweet={handleModalRetweet} />
    </Modal>
  )
}

export default ModalReTweet
