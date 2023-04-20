import { Link, Navigate } from 'react-router-dom'
import useObtenerTweet from '../hooks/useObtenerTweet'
import FormularioTweetEditar from '../components/FormularioTweetEditar'
import FormularioTweetLoader from '../components/animations/FormularioTweetLoader'
import { ChevronLeftSvg } from '../assets/svgs'

const EditarTweetPage = () => {
  // USE OBTENER TWEET
  const { tweet, loading } = useObtenerTweet()

  if (!tweet && !loading) return <Navigate to={'/'} />

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <Link to={`/tweet/${tweet?._id}`} className='flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        {loading ? <div className='l-item--loader' style={{ width: '60%', height: 24 }}></div> : <h2 className='titulo'>Editar Tweet - {tweet.descripcion.slice(0, 10)}...</h2>}
      </div>

      <div className='main'>{loading ? <FormularioTweetLoader /> : <FormularioTweetEditar tweet={tweet} />}</div>
    </section>
  )
}

export default EditarTweetPage
