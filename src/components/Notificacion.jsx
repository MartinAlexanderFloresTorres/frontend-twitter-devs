import { useState } from 'react'
import formatearTiempo from '../helpers/formatearTiempo'
import useNotificacionEstado from '../hooks/useNotificacionEstado'
import useEliminarNotificacion from '../hooks/useEliminarNotificacion'
import Modal from './Modal'
import { EllipsisHorizontalSvg, LoaderSvg } from '../assets/svgs'
import TextoMapeado from './functions/TextoMapeado'

const Notificacion = ({ notificacion, handleNotificacion }) => {
  // Estados
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalOpciones, setModalOpciones] = useState(false)

  const { _id, texto, createdAt, visto } = notificacion

  // USE NOTIFIACION ESTADO
  const { handleEstadoById, loading: loadingEstado } = useNotificacionEstado({ handleNotificacion })

  // USE ELIMINAR NOTIFICACION
  const { eliminarNotificacion, loading: loadingEliminar } = useEliminarNotificacion({ handleNotificacion })

  // HANDLE  MODAL ELIMINAR
  const handleModalEliminar = () => {
    setModalEliminar(!modalEliminar)
  }

  // HANDLE MODAL OPCIONES
  const handleModalOpciones = () => setModalOpciones(!modalOpciones)

  return (
    <>
      <button
        className={`notificaciones__item ${visto ? '' : 'activo'}`}
        onClick={() => {
          if (!visto) return handleEstadoById({ notificacionId: _id })
        }}
        disabled={loadingEstado || visto}
      >
        <div className='notificaciones__item__cabezera flex justify-between'>
          <div>
            <div className='notificaciones__item__descripcion'>{TextoMapeado({ value: texto })}</div>
            <p className='notificaciones__item__cabezera__fecha'>{formatearTiempo(createdAt)}</p>
          </div>
          <div role='button' className='flex btn--hover' title='opciones' onClick={handleModalOpciones}>
            <EllipsisHorizontalSvg />
          </div>
        </div>
      </button>

      {modalEliminar && (
        <Modal center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro)'} handleClose={handleModalEliminar} cabezera={false}>
          <div className='alerta'>
            <h3 className='alerta--top'>Se eliminara la notificaciónes permanentemente</h3>
            <p className='alerta--texto'>¿Desea eliminar?</p>
          </div>
          <div className='botones'>
            <button className='btn--loader btn--3' onClick={() => eliminarNotificacion({ notificacionId: _id, closeModal: handleModalEliminar })} disabled={loadingEliminar}>
              {loadingEliminar ? <LoaderSvg /> : 'Eliminar'}
            </button>
            <button className='btn--2' onClick={handleModalEliminar} disabled={loadingEliminar}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {modalOpciones && (
        <Modal center cabezera={false} cuerpoClass={'no-padding'} centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro)'} handleClose={handleModalOpciones}>
          <button className={`flex w-full border-b btn--loader btn--5 ${visto ? '' : 'text-azul'}`} onClick={() => handleEstadoById({ notificacionId: _id }, handleModalOpciones)} disabled={loadingEstado}>
            {loadingEstado ? <LoaderSvg /> : visto ? 'Desmarcar como visto' : 'Marcar como visto'}
          </button>
          <button
            className='flex w-full border-b btn--5 text-rojo'
            onClick={() => {
              handleModalOpciones()
              handleModalEliminar()
            }}
            disabled={loadingEliminar}
          >
            {loadingEliminar ? 'Eliminando' : 'Eliminar'}
          </button>
        </Modal>
      )}
    </>
  )
}

export default Notificacion
