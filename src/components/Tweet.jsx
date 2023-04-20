import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import useApp from '../hooks/useApp'
import useHeart from '../hooks/useHeart'
import useGuardar from '../hooks/useGuardar'
import Seguidor from './Seguidor'
import TextoConEnlaces from './functions/TextoConEnlaces'
import ReTweet from './ReTweet'
import ModalReTweet from './ModalReTweet'
import ModalOpciones from './ModalOpciones'
import formaterFecha from '../helpers/formaterFecha'
import share from '../helpers/share'
import ModalImagen from './ModalImagen'
import ModalMeEncanta from './ModalMeEncanta'
import { ArrowsPointingOutSvg, AtSymbolSvg, BookmarkIsSvg, BookmarkSvg, ChatBubbleLeftEllipsisSvg, EllipsisHorizontalSvg, HeartIsSvg, HeartSvg, LoaderSvg, ShareSvg } from '../assets/svgs'

const Tweet = ({ tweet, setTweet }) => {
  // ESTADOS
  const [modalRetweet, setModalRetweet] = useState(false)
  const [modalOpciones, setModalOpciones] = useState(false)
  const [modalImagen, setModalImagen] = useState(false)
  const [modalMeEncanta, setModalMeEncanta] = useState(false)

  const { _id, creador, descripcion, foto, retweet, hearts, menciones, comentarios, createdAt } = tweet

  // USE LOCATION
  const { pathname } = useLocation()

  // USE APP
  const { user } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE LOCATION
  const location = useLocation()

  // USE HEART
  const { handleHeartById, loading: loadingHeart } = useHeart({ setTweet })

  // USE GUARDAR
  const { handleGuardarById, loading: loadingGuardar } = useGuardar()

  // isHeart
  const isHeart = user ? hearts.some((t) => t._id === user._id) : false

  // isGuardar
  const isGuardar = user ? user.guardados.includes(_id) : false

  // HANDLE MODAL RETWEET
  const handleModalRetweet = () => {
    if (!user) return navigate('/login', { state: location })

    setModalRetweet(!modalRetweet)
  }

  // HANDLE MODAL OPCIONES
  const handleModalOpciones = () => setModalOpciones(!modalOpciones)

  // HANDLE MODAL IMAGEN
  const handleModalImagen = () => setModalImagen(!modalImagen)

  // HANDLE MODAL OPCIONES
  const handleMeEncanta = () => setModalMeEncanta(!modalMeEncanta)

  return (
    <>
      <div className='tweet'>
        <div className='tweet--contenido'>
          <div className='tweet--top'>
            <div className='flex justify-between w-full'>
              <div className='flex'>
                <Avatar user={creador} className='tweet--avatar' />

                <div className='tweet--top--usuario'>
                  <div className='flex'>
                    <h2>{creador.nombre}</h2>
                    <span className='tweet--top--usuario--hidden'>•</span>
                    <p className='tweet--top--usuario--hidden'>{formaterFecha(createdAt)}</p>
                  </div>
                  <Link to={`/user/${creador.usuario}`} className='usuario webkit-box-1'>
                    {creador.usuario}
                  </Link>
                </div>
              </div>
              <button className='flex btn--hover' title='opciones' onClick={handleModalOpciones}>
                <EllipsisHorizontalSvg />
              </button>
            </div>
          </div>
          <div className='tweet--center'>
            <div
              className={`${!pathname.includes('/tweet/') ? 'tweet--pointer' : ''}`}
              onClick={(e) => {
                if (e.target && e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SVG' && !e.target.classList.contains('tweet--imagen') && !pathname.includes('/tweet/')) {
                  navigate(`/tweet/${_id}`)
                }
              }}
            >
              <TextoConEnlaces value={descripcion} menciones={menciones} />

              {foto && (
                <div className='tweet--imagen' onClick={handleModalImagen}>
                  <img src={foto.secure_url} alt={`${creador.nombre}-foto-publicacion`} />
                  <div className='tweet--imagen--visualizar flex'>
                    <ArrowsPointingOutSvg />
                  </div>
                </div>
              )}
            </div>

            {retweet && retweet.tweetId && <ReTweet tweet={retweet.tweetId} />}
            {retweet && !retweet.tweetId && retweet.usuarioId && <div className='tweet--retweet tweet mt-10 text-center justify-center alerta--error'>El tweet que se re retuiteo a sido eliminado</div>}
          </div>

          {menciones.length > 0 && (
            <div className='tweet--menciones flex w-full'>
              {menciones.map((mencion) => (
                <div key={mencion._id} className='tweet--mencion flex'>
                  <Avatar user={mencion} />
                  <Link className='tweet--mencionLink' to={`/user/${mencion.usuario}`}>
                    {mencion.usuario}
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className='tweet--botones tweet--fecha--visible'>
            <p>{formaterFecha(createdAt)}</p>
          </div>
          <div className='tweet--botones'>
            <div className='flex'>
              <Link to={`/tweet/${_id}`}>
                <b className='text-white'>{comentarios.length}</b>
                <p>Comentario{comentarios.length > 1 ? 's' : ''}</p>
              </Link>

              <button onClick={handleMeEncanta}>
                <b className='text-white'>{hearts.length}</b>
                <p>Me encanta{hearts.length > 1 ? 's' : ''}</p>
              </button>
            </div>
          </div>

          <div className='tweet--botones'>
            <div className='tweet--botones--div'>
              <Link to={`/tweet/${_id}`}>
                <ChatBubbleLeftEllipsisSvg />
              </Link>

              <button className='btn--loader' onClick={() => handleHeartById({ id: _id })} disabled={loadingHeart}>
                {loadingHeart ? <LoaderSvg /> : isHeart ? <HeartIsSvg className='tweet--heart--red' /> : <HeartSvg />}
              </button>

              <button className='btn--loader' onClick={() => handleGuardarById({ id: _id })} disabled={loadingGuardar}>
                {loadingGuardar ? <LoaderSvg /> : isGuardar ? <BookmarkIsSvg /> : <BookmarkSvg />}

                <span>Guardar</span>
              </button>

              <button onClick={handleModalRetweet}>
                <AtSymbolSvg />
                <span>Retuitear</span>
              </button>
            </div>

            <button
              className='tweet--compartir'
              onClick={() =>
                share({
                  title: `Tweet de ${tweet.creador.usuario}`,
                  text: tweet.descripcion.slice(0, 100),
                  url: `${window.location.origin}/tweet/${tweet._id}`
                })
              }
            >
              <span>Compartir</span>
              <ShareSvg />
            </button>
          </div>
        </div>
      </div>

      {modalRetweet && <ModalReTweet tweet={tweet} handleModalRetweet={handleModalRetweet} />}

      {modalMeEncanta && <ModalMeEncanta hearts={hearts} handleMeEncanta={handleMeEncanta} />}

      {modalOpciones && <ModalOpciones tweet={tweet} handleModalOpciones={handleModalOpciones} />}

      {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto.secure_url} />}
    </>
  )
}

export default Tweet
