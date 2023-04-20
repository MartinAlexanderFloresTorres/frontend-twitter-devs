import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_OBTENER_HISTORIAS_SEGUIDORES } from '../services/api/historia'

const useObtenerHistoriasSeguidores = ({ user }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [historias, setHistorias] = useState([])

  // obtener Historias
  const obtenerHistorias = async () => {
    try {
      const { data } = await GET_OBTENER_HISTORIAS_SEGUIDORES()
      setHistorias(data.historias)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  // USE EFFECT
  useEffect(() => {
    if (loading && user) {
      obtenerHistorias()
    }
  }, [loading, user?._id])

  // HANDLE RECARGAR
  const handleRecargar = () => {
    setLoading(true)
  }

  return { loading, historias, handleRecargar }
}

export default useObtenerHistoriasSeguidores
