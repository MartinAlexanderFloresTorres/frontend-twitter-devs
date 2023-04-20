import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useApp from '../hooks/useApp'
import useEliminarTweet from '../hooks/useEliminarTweet'
import BotonBloqueamiento from './BotonBloqueamiento'
import Modal from './Modal'
import share from '../helpers/share'
import { LoaderSvg } from '../assets/svgs'

const ModalOpciones = ({ tweet, handleModalOpciones }) => {
  // ESTADOS
  const [copiado, setCopiado] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  // USE APP
  const { user } = useApp()

  // USE LOCATION
  const { pathname } = useLocation()

  // USE ELIMINAR TWEET
  const { eliminarTweetById, loading: loadingEliminar } = useEliminarTweet()

  // HANDLE COPIAR
  const copiarUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/tweet/${tweet._id}`)
    setCopiado(true)
    if (!copiado) {
      setTimeout(() => {
        setCopiado(false)
        handleModalOpciones()
      }, 3000)
    }
  }

  // HANDLE MODAL ELIMINAR
  const handleModalEliminar = () => setModalEliminar(!modalEliminar)

  return (
    <>
      <Modal cabezera={false} handleClose={handleModalOpciones} centerClass={'w-500 mx-auto'} maxWidth={'100%'} cuerpoClass={'no-padding'} center fondoContainer={'var(--oscuro)'}>
        {user && tweet.creador._id !== user?._id && (
          <div className='w-full btn--5 border-b'>
            <BotonBloqueamiento persona={tweet.creador} callback={handleModalOpciones} />
          </div>
        )}
        {!pathname.includes('/tweet/') && (
          <Link className='w-full btn--5 border-b text-azul' onClick={handleModalOpciones} to={`/tweet/${tweet._id}`}>
            Ir al tweet
          </Link>
        )}

        <button className='w-full btn--5 border-b' onClick={copiarUrl}>
          {copiado ? '¡URL copiada!' : 'Copiar enlace'}
        </button>
        <button
          className='w-full btn--5 border-b text-azul'
          onClick={() =>
            share(
              {
                title: `Tweet de ${tweet.creador.usuario}`,
                text: tweet.descripcion.slice(0, 100),
                url: `${window.location.origin}/tweet/${tweet._id}`
              },
              handleModalOpciones
            )
          }
        >
          Compartir en...
        </button>
        {!pathname.includes('/user/') && (
          <Link className='w-full btn--5 border-b text-azul' onClick={handleModalOpciones} to={`/user/${tweet.creador.usuario}`}>
            Ver perfil
          </Link>
        )}

        {user && user._id === tweet.creador._id && (
          <>
            <Link className='w-full btn--5 border-b text-azul' to={`/tweet/editar/${tweet._id}`}>
              Editar
            </Link>
            <button className='w-full btn--5 border-b text-rojo' onClick={handleModalEliminar}>
              Eliminar
            </button>
          </>
        )}
        <button className='w-full btn--5 border-b' onClick={handleModalOpciones}>
          Cerrar
        </button>
      </Modal>

      {modalEliminar && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center centerClass={'w-500 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalEliminar} titulo={'¿Eliminar Tweet?'}>
          <div className='alerta'>
            <h3 className='alerta--top'>Se eliminara el tweet permanentemente</h3>
            <p className='alerta--texto'>¿Desea eliminar?</p>
          </div>
          <div className='botones'>
            <button className='btn--loader btn--3' onClick={() => eliminarTweetById({ id: tweet._id, handleModalEliminar })} disabled={loadingEliminar}>
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

export default ModalOpciones
