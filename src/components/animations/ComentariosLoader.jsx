import ComentarioLoader from './ComentarioLoader'

const Comentariosloader = () => {
  return (
    <div className='comentarios'>
      <h2 className='comentarios__titulo'>Comentarios</h2>
      <div className='comentarios__lista'>
        <ComentarioLoader />
        <ComentarioLoader />
      </div>
    </div>
  )
}

export default Comentariosloader
