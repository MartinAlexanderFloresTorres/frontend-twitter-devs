import { useState } from 'react'
import { EllipsisVerticalSvg } from '../assets/svgs'
import { useParams } from 'react-router-dom'
import useApp from '../hooks/useApp'
import Modal from './Modal'
import useEliminarChat from '../hooks/useEliminarChat'
import useArchivarChat from '../hooks/useArchivarChat'
import useBloquearChat from '../hooks/useBloquearChat'

const ChatOpciones = ({ conversacion, visible, setVisible, handleIsVisible }) => {
  // ESTADOS
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalArhivar, setModalArchivar] = useState(false)
  const [modalBloquear, setModalBloquear] = useState(false)

  // USE APP
  const { user } = useApp()

  // USE PARAMS
  const { conversacionId, receptorId } = useParams()

  // USE ELIMINAR CHAT
  const { eliminarChat, loading: loadingEliminar } = useEliminarChat()

  // USE ARCHIVAR CHAT
  const { archivarChat, loading: loadingArchivar } = useArchivarChat()

  // USE BLOQUEAR CHAT
  const { bloquearChat, loading: loadingBloquear } = useBloquearChat()

  // HANDLE  MODAL ELIMINAR
  const handleModalEliminar = () => {
    setModalEliminar(!modalEliminar)
    setVisible(false)
  }

  // HANDLE  MODAL ARCHIVAR
  const handleModalArchivar = () => {
    setModalArchivar(!modalArhivar)
    setVisible(false)
  }

  // HANDLE  MODAL BLOQUEAR
  const handleModalBloquear = () => {
    setModalBloquear(!modalBloquear)
    setVisible(false)
  }

  return (
    <>
      <div className='cabezera--opciones'>
        {visible && (
          <>
            <Modal cabezera={false} handleClose={handleIsVisible} centerClass={'w-400 mx-auto'} maxWidth={'100%'} cuerpoClass={'no-padding'} center fondoContainer={'var(--oscuro)'}>
              <button className='w-full btn--5 border-b text-rojo' onClick={handleModalBloquear}>
                {conversacion.bloqueadoPor === '' ? (conversacion.bloqueado ? 'Desbloquear' : 'Bloquear') : conversacion.bloqueadoPor === user._id ? 'Desbloquear' : 'Ha sido Bloqueado'}
              </button>

              <button className='w-full btn--5 border-b text-rojo' onClick={handleModalEliminar}>
                {conversacion.eliminadoPor.includes(user._id) ? 'Recuperar' : 'Eliminar'}
              </button>

              <button className='w-full btn--5 border-b' onClick={handleModalArchivar}>
                {conversacion.archivadoPor.includes(user._id) ? 'Desarchivar' : 'Archivar'}
              </button>

              <button className='w-full btn--5 border-b text-azul' onClick={handleIsVisible}>
                Cerrar
              </button>
            </Modal>
          </>
        )}
      </div>

      {modalEliminar && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalEliminar} cabezera={false}>
          <div className='alerta'>
            <h3 className='alerta--top'>Se eliminaran ambas conversaciones el otro usuario</h3>
            <p className='alerta--texto'>¿Desea eliminar?</p>
          </div>
          <div className='botones'>
            <button className='btn--3' onClick={() => eliminarChat({ conversacionId, receptorId })} disabled={loadingEliminar}>
              {loadingEliminar ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button className='btn--2' onClick={handleModalEliminar} disabled={loadingEliminar}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {modalArhivar && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalArchivar} cabezera={false}>
          <div className='alerta'>
            <h3 className='alerta--top'>Se {conversacion.archivadoPor.includes(user._id) ? 'Desarchivara' : 'Archivara'} ambas conversaciones</h3>
            <p className='alerta--texto'>¿Desea {conversacion.archivadoPor.includes(user._id) ? 'Desarchivar' : 'Archivar'}?</p>
          </div>
          <div className='botones'>
            <button className='btn--1' onClick={() => archivarChat({ conversacionId, receptorId })} disabled={loadingArchivar}>
              {conversacion.archivadoPor.includes(user._id) ? (loadingArchivar ? 'Desarchivando...' : 'Desarchivar') : loadingArchivar ? 'Archivando...' : 'Archivar'}
            </button>
            <button className='btn--2' onClick={handleModalArchivar} disabled={loadingArchivar}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {modalBloquear && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalBloquear} cabezera={false}>
          {conversacion.bloqueadoPor === '' || conversacion.bloqueadoPor === user._id ? (
            <>
              <div className='alerta'>
                <h3 className='alerta--top'>Se {conversacion.bloqueado ? 'Desbloqueara' : 'Bloqueara'} ambas conversaciones </h3>
                <p className='alerta--texto'>¿Desea {conversacion.bloqueado ? 'Desbloquear' : 'Bloquear'}?</p>
              </div>
              <div className='botones'>
                <button className='btn--1' onClick={() => bloquearChat({ conversacionId, receptorId, handleModal: handleModalBloquear })} disabled={loadingBloquear}>
                  {conversacion.bloqueado ? (loadingBloquear ? 'Desbloqueando...' : 'Desbloquear') : loadingBloquear ? 'Bloquando...' : 'Bloquear'}
                </button>
                <button className='btn--2' onClick={handleModalBloquear} disabled={loadingBloquear}>
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='alerta'>
                <h3 className='alerta--top'>El usuario a bloqueado la conversación</h3>
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

export default ChatOpciones
