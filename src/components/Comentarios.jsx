import Comentario from './Comentario'

const Comentarios = ({ creador, comentarios, setTweet, setComentarios }) => {
  return (
    <div className='comentarios'>
      <h2 className='comentarios__titulo'>Comentarios</h2>
      <div className='comentarios__lista'>{comentarios.length > 0 ? comentarios.map((comentario) => <Comentario key={comentario._id} setComentarios={setComentarios} setTweet={setTweet} comentario={comentario} creador={creador} />) : <p>No hay comentarios aun</p>}</div>
    </div>
  )
}

export default Comentarios
