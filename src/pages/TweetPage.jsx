import { Link, Navigate } from 'react-router-dom'
import Tweet from '../components/Tweet'
import { ChevronLeftSvg } from '../assets/svgs'
import Comentarios from '../components/Comentarios'
import FormularioComentario from '../components/FormularioComentario'
import useObtenerTweet from '../hooks/useObtenerTweet'
import TweetLoader from '../components/animations/TweetLoader'
import ComentariosLoader from '../components/animations/ComentariosLoader'
import FormularioComentarioLoader from '../components/animations/FormularioComentarioLoader'
import useObtenerComentarios from '../hooks/useObtenerComentarios'

const TweetPage = () => {
  // USE OBTENER TWEET
  const { tweet, loading: loadingTweet, setTweet } = useObtenerTweet()

  // USE OBTENER COMENTARIOS
  const { comentarios, loading: loadingComentarios, setComentarios } = useObtenerComentarios()

  if (!loadingTweet && !tweet) return <Navigate to={'/'} />

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <Link to='/' className='cabezera--flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        {loadingTweet ? <div className='l-item--loader' style={{ width: '100%', height: 25 }}></div> : <h1 className='titulo'>Tweet {tweet.creador.usuario}</h1>}
      </div>

      <div className='main'>
        {loadingTweet ? (
          <div className='padding'>
            <TweetLoader />
          </div>
        ) : (
          <div className='padding'>
            <Tweet tweet={tweet} setTweet={setTweet} />
          </div>
        )}

        {loadingComentarios || !tweet ? (
          <>
            <FormularioComentarioLoader />
            <div className='padding'>
              <ComentariosLoader />
            </div>
          </>
        ) : (
          <>
            <FormularioComentario setTweet={setTweet} setComentarios={setComentarios} />
            <div className='padding'>
              <Comentarios setTweet={setTweet} setComentarios={setComentarios} comentarios={comentarios} creador={tweet.creador} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default TweetPage
