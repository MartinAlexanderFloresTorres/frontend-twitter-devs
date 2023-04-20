import FormularioTweet from '../components/FormularioTweet'

const NuevoTweetPage = () => {
  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <h2 className='titulo'>Nuevo Tweet</h2>
      </div>

      <div className='main'>
        <FormularioTweet />
      </div>
    </section>
  )
}

export default NuevoTweetPage
