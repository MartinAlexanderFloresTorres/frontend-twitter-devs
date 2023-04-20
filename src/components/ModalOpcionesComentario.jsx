import React, { useState } from 'react'
import useApp from '../hooks/useApp'
import Modal from './Modal'
import useEliminarComentario from '../hooks/useEliminarComentario'
import { LoaderSvg } from '../assets/svgs'
import FormularioComentarioEditar from './FormularioComentarioEditar'
import { Link, useParams } from 'react-router-dom'
import BotonBloqueamiento from './BotonBloqueamiento'

const ModalOpcionesComentario = ({ creadorId, comentario, setTweet, setComentarios, handleModalOpciones }) => {
  // ESTADOS
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)

  const { _id, creador } = comentario

  const { id: tweetId } = useParams()

  // USE APP
  const { user } = useApp()

  // USE ELIMINAR TWEET
  const { eliminarComentarioById, loading: loadingEliminar } = useEliminarComentario({ setTweet, setComentarios })

  // HANDLE MODAL ELIMINAR
  const handleModalEliminar = () => setModalEliminar(!modalEliminar)

  // HANDLE MODAL ELIMINAR
  const handleModalEditar = () => setModalEditar(!modalEditar)

  return (
    <>
      <Modal cabezera={false} handleClose={handleModalOpciones} centerClass={'w-400 mx-auto'} maxWidth={'100%'} cuerpoClass={'no-padding'} center fondoContainer={'var(--oscuro)'}>
        {user && user._id !== creador._id && (
          <div className='flex w-full btn--5 border-b'>
            <BotonBloqueamiento persona={creador} callback={handleModalOpciones} />
          </div>
        )}

        {user && user._id === creador._id ? (
          <>
            <button className='w-full btn--5 border-b text-azul' onClick={handleModalEditar}>
              Editar
            </button>
            <button className='w-full btn--5 border-b text-rojo' onClick={handleModalEliminar}>
              Eliminar
            </button>
          </>
        ) : (
          user &&
          user._id === creadorId && (
            <button className='w-full btn--5 border-b text-rojo' onClick={handleModalEliminar}>
              Eliminar
            </button>
          )
        )}

        <Link className='w-full btn--5 border-b text-azul' to={`/user/${creador.usuario}`}>
          Ver Perfil
        </Link>
        <button className='w-full btn--5 border-b' onClick={handleModalOpciones}>
          Cerrar
        </button>
      </Modal>

      {modalEliminar && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalEliminar} titulo={'¿Eliminar Comentario?'}>
          <div className='alerta'>
            <h3 className='alerta--top'>Se eliminara el comentario permanentemente</h3>
            <p className='alerta--texto'>¿Desea eliminar?</p>
          </div>
          <div className='botones'>
            <button
              className='btn--loader btn--3'
              onClick={() =>
                eliminarComentarioById({ comentarioId: _id, tweetId }, () => {
                  handleModalEliminar()
                  handleModalOpciones()
                })
              }
              disabled={loadingEliminar}
            >
              {loadingEliminar ? <LoaderSvg /> : 'Eliminar'}
            </button>
            <button className='btn--2' onClick={handleModalEliminar} disabled={loadingEliminar}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {modalEditar && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} center cuerpoClass={'no-padding'} centerClass={'w-700 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--primary-color)'} handleClose={handleModalEditar} titulo={'Editar Comentario'}>
          <FormularioComentarioEditar
            comentario={comentario}
            setComentarios={setComentarios}
            callback={() => {
              handleModalEliminar()
              handleModalOpciones()
            }}
          />
        </Modal>
      )}
    </>
  )
}

export default ModalOpcionesComentario
