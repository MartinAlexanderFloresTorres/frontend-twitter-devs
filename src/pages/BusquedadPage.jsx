import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Tweets from '../components/Tweets'
import useObtenerTweetsBusqueda from '../hooks/useObtenerTweetsBusqueda'
import Usuarios from '../components/Usuarios'
import { LoaderSvg } from '../assets/svgs'
import Modal from '../components/Modal'

const BusquedadPage = () => {
  // USE STATE
  const [modalUsuarios, setModalUsuarios] = useState(false)

  // USE SEARCH PARAMS
  const [params] = useSearchParams('')

  const q = params.get('q')

  // USE OBTENER TWEETS
  const { tweets, usuarios, loading, nextPageTweetBusqueda, hasNextPage, editarTweet } = useObtenerTweetsBusqueda({ q })

  // HANDLE  MODAL USUARIOS
  const handleModalUsuarios = () => setModalUsuarios(!modalUsuarios)

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <h2 className='titulo'>
          Resultados de: <span className='cabezera__hashtag'>{q}</span>
        </h2>
      </div>

      <div className='main'>
        {usuarios.length > 0 && (
          <div className='padding'>
            <button className='btn--2' onClick={handleModalUsuarios}>
              Ver usuarios encontrados
            </button>
          </div>
        )}

        <Tweets tweets={tweets} nextPage={nextPageTweetBusqueda} hasNextPage={hasNextPage} actualizarTweet={editarTweet} loading={loading} />

        {modalUsuarios && (
          <Modal handleClose={handleModalUsuarios} centerClass={'w-600 mx-auto'} cuerpoClass={'no-padding'} maxWidth={'100%'} cabezera={false} fondoContainer={'var(--primary-color)'}>
            <div>
              {loading ? (
                <div className='flex padding'>
                  <LoaderSvg />
                </div>
              ) : (
                <div className='border--top'>
                  <Usuarios titulo={'Usuarios encontrados'} usuarios={usuarios} />
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    </section>
  )
}

export default BusquedadPage
