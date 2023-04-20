import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import MensajePreview from '../components/MensajePreview'
import useObtenerConversacionesPrevias from '../hooks/useObtenerConversacionesPrevias'
import MensajeLoader from '../components/MensajeLoader'
import { LoaderSvg } from '../assets/svgs'

const MensajesPage = () => {
  // USE OBTENER MENSAJES BY TO
  const { conversaciones, loading, nextPageConversacion, hasNextPageConversacion } = useObtenerConversacionesPrevias()

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante justify-between'>
        <h2 className='titulo'>Mensajes</h2>

        <Link to={'/mensajes/archivados'} className='btn--2'>
          Archivados
        </Link>
      </div>

      {loading ? (
        <div className='contenedor__mensajes contenedor__mensajes--noMargin no-padding'>
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
          <MensajeLoader />
        </div>
      ) : (
        <div className='contenedor__mensajes contenedor__mensajes--noMargin no-padding'>
          {conversaciones.length > 0 ? (
            <InfiniteScroll
              dataLength={conversaciones.length}
              next={nextPageConversacion}
              hasMore={hasNextPageConversacion}
              loader={
                <div className='flex'>
                  <LoaderSvg />
                </div>
              }
            >
              {conversaciones.map((mensaje) => (
                <MensajePreview key={mensaje._id} mensaje={mensaje} />
              ))}
            </InfiniteScroll>
          ) : (
            <div className='padding'>No hay mensajes</div>
          )}
        </div>
      )}
    </section>
  )
}

export default MensajesPage
