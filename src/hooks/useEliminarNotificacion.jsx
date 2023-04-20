import { useState } from 'react'
import { toast } from 'react-toastify'
import { DELETE_NOTIFICACION } from '../services/api/notificacion'

const useEliminarNotificacion = ({ handleNotificacion }) => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // FUNCIONES
  const eliminarNotificacion = async ({ notificacionId, closeModal }) => {
    setLoading(true)
    try {
      const { data } = await DELETE_NOTIFICACION({ notificacionId })
      toast.success(data.message, { icon: '✅' })
      handleNotificacion(data.notificacion, true)
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { loading, eliminarNotificacion }
}

export default useEliminarNotificacion
