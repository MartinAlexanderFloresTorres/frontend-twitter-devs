import { useState } from 'react'
import { toast } from 'react-toastify'
import { GET_ESTADO } from '../services/api/notificacion'

const useNotificacionEstado = ({ handleNotificacion }) => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // FUNCIONES
  const handleEstadoById = async ({ notificacionId }, callback = () => {}) => {
    if (loading) return
    setLoading(true)

    try {
      const { data } = await GET_ESTADO({ notificacionId })
      // SINCRONIZAR
      handleNotificacion(data.notificacion)
      callback()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return { loading, handleEstadoById }
}

export default useNotificacionEstado
