import Tweets from '../components/Tweets'
import useObtenerTweetsGuardados from '../hooks/useObtenerTweetsGuardados'

const GuardadosPage = () => {
  // USE OBTENER TWEETS GUARDADOS
  const { tweets, editarTweet, loading, nextPage, hasNextPage } = useObtenerTweetsGuardados()

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <h2 className='titulo'>Guardados</h2>
      </div>

      <div className='main'>
        <Tweets tweets={tweets} nextPage={nextPage} hasNextPage={hasNextPage} actualizarTweet={editarTweet} loading={loading} />
      </div>
    </section>
  )
}

export default GuardadosPage
