import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useApp from './useApp'
import { GET_BLOQUEAR_MENSAJES_RECEPTOR } from '../services/api/mensaje'

const useBloquearChat = (callback = () => {}) => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE APP
  const { socket } = useApp()

  // FUNCIONES
  const bloquearChat = async ({ conversacionId, receptorId, handleModal }) => {
    setLoading(true)
    try {
      const { data } = await GET_BLOQUEAR_MENSAJES_RECEPTOR({ conversacionId, receptorId })
      toast.success(data.message, { icon: '✅' })
      handleModal()
      // EMITIR EVENTO AL BLOQUEAR O DESBLOQUEAR
      socket.emit('/bloqueo/conversacion/emitir', data.conversacion)

      // EXISTE UNA NOTIFICACION
      if (data.notificacion) {
        // EMITIR LA NOTIFICACION PARA EL USUARIO
        socket.emit('/usuario/notificaciones/emitir', data.notificacion)
      }
      callback()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      navigate('/mensajes')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { loading, bloquearChat }
}

export default useBloquearChat
