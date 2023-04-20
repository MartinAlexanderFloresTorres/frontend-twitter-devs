import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import MensajePreview from '../components/MensajePreview'
import MensajeLoader from '../components/MensajeLoader'
import useObtenerConversacionesArchivadosPrevias from '../hooks/useObtenerConversacionesArchivadosPrevias'
import { LoaderSvg } from '../assets/svgs'

const MensajesArchivadosPage = () => {
  // USE OBTENER MENSAJES BY TO
  const { conversaciones, loading, nextPageConversacion, hasNextPageConversacion } = useObtenerConversacionesArchivadosPrevias()

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante justify-between'>
        <h2 className='titulo'>Archivados</h2>

        <Link to={'/mensajes'} className='btn--2'>
          Mensajes
        </Link>
      </div>

      {loading ? (
        <div className='contenedor__mensajes  contenedor__mensajes--noMargin no-padding'>
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

export default MensajesArchivadosPage
