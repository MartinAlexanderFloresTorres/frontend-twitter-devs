import { useState } from 'react'
import useApp from '../hooks/useApp'
import FormularioTweet from './FormularioTweet'
import Modal from './Modal'
import Avatar from './Avatar'

const TweetCard = () => {
  // ESTADOS
  const [modal, setModal] = useState(false)

  // USE APP
  const { user } = useApp()

  // FUNCIONES
  const toggleModal = () => setModal(!modal)

  return (
    <>
      <div className='tweet-popup'>
        <div className='flex justify-between tweet-card'>
          <Avatar user={user} />
          <button className='tweet-card-placeholder' onClick={toggleModal}>
            ¿Qué está pasando, {user?.nombre.split(' ')[0]}?
          </button>
        </div>
      </div>

      {modal && (
        <Modal
          titulo={'Crear Publicación'}
          handleClose={toggleModal}
          center
          cuerpoClass={'no-padding'}
          centerClass={'mx-auto w-600'}
          fondoContainer={'var(--primary-color)'}
          maxWidth={'100%'}
        >
          <FormularioTweet callback={toggleModal} />
        </Modal>
      )}
    </>
  )
}

export default TweetCard
