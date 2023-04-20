import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POST_HEART } from '../services/api/historia'
import useApp from './useApp'

const useHeartHistoria = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { user, socket } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE LOCATION
  const location = useLocation()

  // FUNCIONES
  const handleHeartById = async ({ historiaId, editarHistoria }) => {
    // Autenticado
    if (!user) return navigate('/login', { state: location })

    setLoading(true)
    try {
      const { data } = await POST_HEART({ historiaId })
      toast.success(data.message, { icon: '❤' })
      // SINCRONIZAR
      editarHistoria(data.historia)
      // EXISTE UNA NOTIFICACION
      if (data.notificacion) {
        // EMITIR LA NOTIFICACION PARA EL USUARIO
        socket.emit('/usuario/notificaciones/emitir', data.notificacion)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return { loading, handleHeartById }
}

export default useHeartHistoria
