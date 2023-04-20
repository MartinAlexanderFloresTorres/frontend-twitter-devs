import { useState } from 'react'
import { toast } from 'react-toastify'
import { GET_NOTIFICACIONES_VISTAS_TODAS } from '../services/api/notificacion'
import useApp from './useApp'

const useMarcarVistasTodas = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { notificaciones, setNotificaciones } = useApp()

  // FUNCIONES
  const marcarVistastodas = async (callback = () => {}) => {
    setLoading(true)
    try {
      const { data } = await GET_NOTIFICACIONES_VISTAS_TODAS()
      toast.success(data.message, { icon: '✅' })
      setNotificaciones((prev) =>
        prev.map((n) => {
          n.visto = true
          return n
        })
      )
      callback()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { loading, marcarVistastodas }
}

export default useMarcarVistasTodas
