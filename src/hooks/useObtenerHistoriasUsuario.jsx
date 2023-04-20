import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_OBTENER_HISTORIAS_USUARIO } from '../services/api/historia'

const useObtenerHistoriasUsuario = ({ usuarioId }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [historias, setHistorias] = useState([])

  // USE NAVIGATE
  const navigate = useNavigate()

  const obtenerHistorias = async ({ usuarioId }) => {
    setLoading(true)
    try {
      const { data } = await GET_OBTENER_HISTORIAS_USUARIO({ usuarioId })
      setHistorias(data)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      // REDIRECCIONAR
      navigate('/')
    }
    setLoading(false)
  }

  // USE EFFECT
  useEffect(() => {
    if (usuarioId) {
      obtenerHistorias({ usuarioId })
    }
  }, [usuarioId])

  // EDITAR HISTORIA
  const editarHistoria = (historia) => {
    setHistorias(historias.map((t) => (t._id === historia._id ? historia : t)))
  }

  return { loading, historias, editarHistoria }
}

export default useObtenerHistoriasUsuario
