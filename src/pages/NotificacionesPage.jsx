import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useApp from '../hooks/useApp'
import Notificacion from '../components/Notificacion'
import OpcionesNotificaciones from '../components/OpcionesNotificaciones'
import NotificacionLoader from '../components/animations/NotificacionLoader'
import { EllipsisVerticalSvg, LoaderSvg } from '../assets/svgs'

const NotificacionesPage = () => {
  // ESTADOS
  const [modalOpciones, setModalOpciones] = useState(false)

  // USE OBTENER NOTIFICIACIONES
  const { notificaciones, handleNotificacion, loadingNotificacion, nextPageNotificacion, hasNextPageNotificacion, hasPrevPageNotificacion } = useApp()

  // HANDLE  MODAL OPCIONES
  const handleModalOpciones = () => setModalOpciones(!modalOpciones)

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante justify-between paddingy-10'>
        <h2 className='titulo'>Notificaciones</h2>
        <button className='btn--hover' onClick={handleModalOpciones}>
          <EllipsisVerticalSvg />
        </button>
      </div>

      <div className='main'>
        {loadingNotificacion ? (
          <div className='notificaciones'>
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
            <NotificacionLoader />
          </div>
        ) : notificaciones.length > 0 ? (
          <InfiniteScroll
            dataLength={notificaciones.length}
            next={nextPageNotificacion}
            hasMore={hasNextPageNotificacion}
            loader={
              <div className='flex padding'>
                <LoaderSvg />
              </div>
            }
          >
            <div className='notificaciones'>
              {notificaciones.map((notificacion) => (
                <Notificacion key={notificacion._id} notificacion={notificacion} handleNotificacion={handleNotificacion} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className='padding'>No hay notificaciones</div>
        )}
      </div>

      <OpcionesNotificaciones modalOpciones={modalOpciones} handleModalOpciones={handleModalOpciones} />
    </section>
  )
}

export default NotificacionesPage
