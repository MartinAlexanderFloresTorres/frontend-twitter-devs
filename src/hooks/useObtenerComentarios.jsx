import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_OBTENER_COMENTARIOS } from '../services/api/comentario'

const useObtenerComentarios = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [comentarios, setComentarios] = useState([])

  // USE PARAMS
  const { id } = useParams()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE EFFECT
  useEffect(() => {
    const obtenerComentariosTweetById = async ({ id }) => {
      setLoading(true)
      try {
        const { data } = await GET_OBTENER_COMENTARIOS({ tweetId: id })
        setComentarios(data)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
        // REDIRECCIONAR
        navigate('/')
      }
      setLoading(false)
    }

    if (id) {
      obtenerComentariosTweetById({ id })
    } else {
      setLoading(false)
    }
  }, [id])

  return { comentarios, loading, setComentarios }
}

export default useObtenerComentarios
