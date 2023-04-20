import { useState } from 'react'
import { toast } from 'react-toastify'
import { DELETE_NOTIFICACIONES } from '../services/api/notificacion'
import useApp from './useApp'

const useEliminarNotificaciones = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { setNotificaciones } = useApp()

  // FUNCIONES
  const eliminarNotificaciones = async (callback = () => {}) => {
    setLoading(true)
    try {
      const { data } = await DELETE_NOTIFICACIONES()
      toast.success(data.message, { icon: '✅' })
      setNotificaciones([])
      callback()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { loading, eliminarNotificaciones }
}

export default useEliminarNotificaciones
