import { useState } from 'react'
import Modal from './Modal'
import useEliminarNotificaciones from '../hooks/useEliminarNotificaciones'
import useMarcarVistasTodas from '../hooks/useMarcarVistasTodas'
import { LoaderSvg } from '../assets/svgs'

const OpcionesNotificaciones = ({ modalOpciones, handleModalOpciones }) => {
  // Estados
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalVistas, setModalVistas] = useState(false)

  // USE ELIMINAR NOTIFICACIONES
  const { eliminarNotificaciones, loading: loadingEliminar } = useEliminarNotificaciones()

  // USE MARCAR VISTAS TODAS
  const { marcarVistastodas, loading: loadingVistasTodas } = useMarcarVistasTodas()

  // HANDLE  MODAL ELIMINAR
  const handleModalEliminar = () => setModalEliminar(!modalEliminar)

  // HANDLE  MODAL VISTAS
  const handleModalVistas = () => setModalVistas(!modalVistas)

  return (
    <>
      {modalOpciones && (
        <Modal cabezera={false} cuerpoClass={'no-padding'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalOpciones}>
          <button className='btn--5 border-b w-full' onClick={handleModalVistas}>
            Marcar como vistos
          </button>
          <button className='btn--5  border-b w-full text-rojo' onClick={handleModalEliminar}>
            Eliminar notificaciónes
          </button>
        </Modal>
      )}

      {modalVistas && (
        <Modal center centerClass={'w-400 mx-auto'} cuerpoClass={'no-padding'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalVistas} cabezera={false}>
          <button
            className='btn--loader flex btn--5 border-b w-full text-azul'
            onClick={() =>
              marcarVistastodas(() => {
                handleModalVistas()
                handleModalOpciones()
              })
            }
            disabled={loadingVistasTodas}
          >
            {loadingVistasTodas ? <LoaderSvg /> : 'Confirmar'}
          </button>
          <button className='btn--5 border-b w-full text-rojo' onClick={handleModalVistas} disabled={loadingVistasTodas}>
            Cancelar
          </button>
        </Modal>
      )}

      {modalEliminar && (
        <Modal center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalEliminar} cabezera={false}>
          <div className='alerta'>
            <h3 className='alerta--top'>Se eliminaran las notificaciónes permanentemente</h3>
            <p className='alerta--texto'>¿Desea eliminarlas?</p>
          </div>
          <div className='botones'>
            <button
              className='btn--loader btn--3'
              onClick={() =>
                eliminarNotificaciones(() => {
                  handleModalEliminar()
                  handleModalOpciones()
                })
              }
              disabled={loadingEliminar}
            >
              {loadingEliminar ? <LoaderSvg /> : 'Eliminar'}
            </button>
            <button className='btn--2' onClick={handleModalEliminar} disabled={loadingEliminar}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default OpcionesNotificaciones
