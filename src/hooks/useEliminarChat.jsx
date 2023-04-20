import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DELETE_MENSAJES_RECEPTOR } from '../services/api/mensaje'
import useApp from './useApp'

const useEliminarChat = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE APP
  const { socket } = useApp()

  // FUNCIONES
  const eliminarChat = async ({ conversacionId, receptorId }) => {
    setLoading(true)
    try {
      const { data } = await DELETE_MENSAJES_RECEPTOR({ conversacionId, receptorId })
      toast.success(data.message, { icon: '✅' })
      navigate(`/mensajes`)
      // EMITIR EVENTO AL ELIMINAR LA CONVERSACION
      socket.emit('/eliminar/conversacion/emitir', { mensajes: data.mensajes, conversacion: data.conversacion })

      // EXISTE UNA NOTIFICACION
      if (data.notificacion) {
        // EMITIR LA NOTIFICACION PARA EL USUARIO
        socket.emit('/usuario/notificaciones/emitir', data.notificacion)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { loading, eliminarChat }
}

export default useEliminarChat
