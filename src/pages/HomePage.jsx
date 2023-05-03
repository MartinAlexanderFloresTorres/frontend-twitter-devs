import Autorizacion from '../components/Autorizacion'
import TweetCard from '../components/TweetCard'
import Historias from '../components/Historias'
import Tweets from '../components/Tweets'
import FormularioTweetLoader from '../components/animations/FormularioTweetLoader'
import HistoriasLoader from '../components/animations/HistoriasLoader'
import useApp from '../hooks/useApp'

const HomePage = () => {
  // USE APP
  const { user, loadingUser, tweets, loadingTweets, editarTweet, nextPage, hasNextPage } = useApp()

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <h1 className='titulo'>Inicio</h1>
      </div>

      <div className='main'>
        {loadingUser ? (
          <>
            <div className='historias'>
              <HistoriasLoader />
            </div>
            <FormularioTweetLoader />
          </>
        ) : user ? (
          <>
            <Historias />
            <TweetCard />
          </>
        ) : (
          <Autorizacion />
        )}

        <Tweets
          tweets={tweets}
          nextPage={nextPage}
          hasNextPage={hasNextPage}
          actualizarTweet={editarTweet}
          loading={loadingTweets}
        />
      </div>
    </section>
  )
}

export default HomePage
