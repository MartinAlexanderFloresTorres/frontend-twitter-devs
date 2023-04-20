import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApp from '../hooks/useApp'
import useEliminarHistoria from '../hooks/useEliminarHistoria'
import Modal from './Modal'
import Historia from './Historia'
import { LoaderSvg } from '../assets/svgs'

const ModalHistoria = ({ historias = [] }) => {
  // USE APP
  const { user, handleCerrarModalHistoria } = useApp()

  // INDEX DE LA PRIMERA HISTORIA NO VISTA
  const index = historias.findIndex((h) => !h.vistosPor.includes(user._id))

  // ESTADOS
  const [historiaActual, setHistoriaActual] = useState(index !== -1 ? index : 0)
  const [progreso, setProgreso] = useState(0)
  const [opcionesActive, setOpcionesActive] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [pauseHistoria, setPauseHistoria] = useState(false)

  // HISTORIA IN INDEX
  const historia = historias[historiaActual]

  // Historias IdS
  const historiasIds = historias.map((h) => h._id)

  // USE ELIMINAR HISTORIA BY ID
  const { eliminarHistoriaById, loading: loadingEliminar } = useEliminarHistoria()

  // EFFECT PARA VER SI NO HAY UNA HISTORIA CERRAR EL MODAL
  useEffect(() => {
    if (!historia) {
      handleCerrarModalHistoria()
    }
  }, [historia])

  // HANDLE NEXT HISTORIA
  const handleNextHistoria = () => {
    if (historiaActual < historias.length - 1) {
      // Reiniciar el progreso
      setProgreso(0)
      setHistoriaActual(historiaActual + 1)
      setModalEliminar(false)
    }
  }

  // HANDLE PREV HISTORIA
  const handlePrevHistoria = () => {
    if (historiaActual > 0) {
      // Reiniciar el progreso
      setProgreso(0)
      setHistoriaActual(historiaActual - 1)
      setModalEliminar(false)
    }
  }

  // HANDLE MODAL ELIMINAR
  const handleModalEliminar = () => {
    setOpcionesActive(false)
    setModalEliminar(!modalEliminar)
    setPauseHistoria(!modalEliminar)
  }

  // SI NO HAY UNA HISTORIA
  if (historia) {
    return (
      <>
        <Modal fondo={'var(--primary-color)'} fondoContainer={'var(--primary-color)'} height={'calc(100vh - 59px)'} maxWidth={'50vh'} handleClose={handleCerrarModalHistoria} titulo={'Historias'} cabezeraFlotante cuerpoClass={'historia__completa'}>
          <Historia
            historiasIds={historiasIds}
            historiaId={historia._id}
            creador={historia.creador}
            setPauseHistoria={setPauseHistoria}
            pauseHistoria={pauseHistoria}
            setOpcionesActive={setOpcionesActive}
            opcionesActive={opcionesActive}
            setProgreso={setProgreso}
            progreso={progreso}
            setHistoriaActual={setHistoriaActual}
            historiaActual={historiaActual}
            handlePrevHistoria={handlePrevHistoria}
            handleNextHistoria={handleNextHistoria}
          />
        </Modal>

        {modalEliminar && historia && (
          <Modal maxWidth={350} cabezera={false} center centerClass={'w-fit mx-auto'} cuerpoClass={'no-padding'} fondoContainer={'var(--oscuro)'} height={'auto'} handleClose={handleModalEliminar}>
            <button
              className='btn--loader btn--5 w-full border-b text-rojo'
              onClick={() =>
                eliminarHistoriaById({
                  historiaId: historia._id,
                  handleCloseModal: () => {
                    handleModalEliminar()
                    handleCerrarModalHistoria()
                  }
                })
              }
              disabled={loadingEliminar}
            >
              {loadingEliminar ? <LoaderSvg /> : 'Eliminar'}
            </button>
            <button className='btn--5 w-full border-b' onClick={handleModalEliminar}>
              Cerrar
            </button>
          </Modal>
        )}

        {opcionesActive && historia && (
          <Modal maxWidth={350} cabezera={false} center centerClass={'w-fit mx-auto'} cuerpoClass={'no-padding'} fondoContainer={'var(--oscuro)'} height={'auto'} handleClose={() => setOpcionesActive(false)}>
            <button className='btn--5 w-full border-b text-rojo' onClick={handleModalEliminar}>
              Eliminar
            </button>
            <Link to={`/user/${historia.creador.usuario}`} className='btn--5 w-full border-b text-azul'>
              {historia.creador.usuario}
            </Link>
            <button className='btn--5 w-full border-b' onClick={() => setOpcionesActive(false)}>
              Cerrar
            </button>
          </Modal>
        )}
      </>
    )
  }
}

export default ModalHistoria
