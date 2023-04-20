import { useState } from 'react'
import useBloquearChat from '../hooks/useBloquearChat'
import Modal from './Modal'
import useApp from '../hooks/useApp'
import useObtenerConversacion from '../hooks/useObtenerConversacion'
import { LoaderSvg } from '../assets/svgs'

const BotonBloqueamiento = ({ persona, callback = () => {} }) => {
  const [modalBloquear, setModalBloquear] = useState(false)

  // USE APP
  const { user } = useApp()

  // USE BLOQUEAR CHAT
  const { bloquearChat, loading: loadingBloquear } = useBloquearChat(callback)

  // USE OBTENER CONVERSACION
  const { conversacion, loading } = useObtenerConversacion({ receptorId: persona._id })

  // HANDLE  MODAL BLOQUEAR
  const handleModalBloquear = () => {
    setModalBloquear(!modalBloquear)
  }

  if (loading)
    return (
      <div className='flex btn--loader btn--padding'>
        <LoaderSvg />
      </div>
    )

  return (
    <>
      <button className={`btn--${conversacion.bloqueado ? '2' : '3'}`} onClick={handleModalBloquear}>
        {conversacion.bloqueadoPor === '' ? (conversacion.bloqueado ? 'Desbloquear' : 'Bloquear') : conversacion.bloqueadoPor === user?._id ? 'Desbloquear' : 'Ha sido Bloqueado'}
      </button>

      {modalBloquear && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalBloquear} cabezera={false}>
          {conversacion.bloqueadoPor === '' || conversacion.bloqueadoPor === user?._id ? (
            <>
              <div className='alerta'>
                <h3 className='alerta--top'>Se {conversacion.bloqueado ? 'Desbloqueara' : 'Bloqueara'} ambas conversaciones </h3>
                <p className='alerta--texto'>¿Desea {conversacion.bloqueado ? 'Desbloquear' : 'Bloquear'}?</p>
              </div>
              <div className='botones'>
                <button className='btn--1' onClick={() => bloquearChat({ conversacionId: conversacion._id, receptorId: persona._id, handleModal: handleModalBloquear })} disabled={loadingBloquear}>
                  {conversacion.bloqueado ? (loadingBloquear ? 'Desbloqueando...' : 'Desbloquear') : loadingBloquear ? 'Bloqueando...' : 'Bloquear'}
                </button>
                <button className='btn--2' onClick={handleModalBloquear} disabled={loadingBloquear}>
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='alerta'>
                <h3 className='alerta--top'>El usuario te a bloqueado</h3>
                <p className='alerta--texto'>Comuniquese con el usuario</p>
              </div>
              <div className='botones'>
                <button className='btn--2' onClick={handleModalBloquear} disabled={loadingBloquear}>
                  Cerrar
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default BotonBloqueamiento
