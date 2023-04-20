import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import ModalOpcionesComentario from './ModalOpcionesComentario'
import ModalImagen from './ModalImagen'
import TextoConEnlaces from './functions/TextoConEnlaces'
import { ArrowsPointingOutSvg, EllipsisHorizontalSvg } from '../assets/svgs'

const Comentario = ({ creador, comentario, setComentarios, setTweet }) => {
  // ESTADOS
  const [modalOpciones, setModalOpciones] = useState(false)
  const [modalImagen, setModalImagen] = useState(false)

  const { foto, texto, creador: creadorComentario } = comentario

  // HANDLE MODAL OPCIONES
  const handleModalOpciones = () => setModalOpciones(!modalOpciones)

  // HANDLE MODAL OPCIONES
  const handleModalImagen = () => setModalImagen(!modalImagen)

  return (
    <>
      <div className='comentario'>
        <div className='comentario__top--avatar'>
          <Avatar user={creadorComentario} />
        </div>
        <div className='w-full'>
          <div className='comentario__top flex justify-between w-full'>
            <div>
              <p className='nombre'>{creadorComentario.nombre}</p>
              <Link to={`/user/${creadorComentario.usuario}`} className='usuario'>
                {creadorComentario.usuario}
              </Link>
            </div>

            <button className='flex btn--hover' title='opciones' onClick={handleModalOpciones}>
              <EllipsisHorizontalSvg />
            </button>
          </div>

          <div>{creador._id === creadorComentario._id && <p className='comentario__top--creador'>Creador</p>}</div>

          <div className='comentario__texto'>{<TextoConEnlaces value={texto} menciones={comentario.menciones} />}</div>
          {foto && (
            <div className='tweet--imagen comentario--imagen cursor-pointer' onClick={handleModalImagen}>
              <img className='comentario__foto' src={foto.secure_url} alt='foto comentario' />
              <div className='tweet--imagen--visualizar flex'>
                <ArrowsPointingOutSvg />
              </div>
            </div>
          )}
        </div>
      </div>

      {modalOpciones && <ModalOpcionesComentario creadorId={creador._id} setTweet={setTweet} setComentarios={setComentarios} comentario={comentario} handleModalOpciones={handleModalOpciones} />}

      {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto.secure_url} />}
    </>
  )
}

export default Comentario
