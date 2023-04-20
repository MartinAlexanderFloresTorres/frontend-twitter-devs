import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DELETE_COMENTARIO } from '../services/api/comentario'

const useEliminarComentario = ({ setTweet, setComentarios }) => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const eliminarComentarioById = async ({ tweetId, comentarioId }, callback) => {
    setLoading(true)
    try {
      const { data } = await DELETE_COMENTARIO({ comentarioId, tweetId })
      toast.success(data.message, { icon: '✅' })
      // SINCRONIZAR
      setTweet((prev) => {
        prev.comentarios = prev.comentarios.filter((c) => c !== comentarioId)
        return prev
      })
      setComentarios((prev) => {
        prev = prev.filter((c) => c._id !== comentarioId)
        return prev
      })
      callback()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    navigate(`/tweet/${tweetId}`)
    setLoading(false)
  }

  return { loading, eliminarComentarioById }
}

export default useEliminarComentario
