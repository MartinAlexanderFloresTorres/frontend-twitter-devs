import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_CONVERSACION } from '../services/api/mensaje'
import useApp from './useApp'

const useObtenerConversacion = ({ receptorId }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [conversacion, setConversacion] = useState({})

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE APP
  const { user, socket } = useApp()

  // EFFECT
  useEffect(() => {
    const obtenerConversacion = async ({ receptorId }) => {
      setLoading(true)
      try {
        const { data } = await GET_CONVERSACION({ receptorId })
        setConversacion(data)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
        // REDIRECCIONAR
        navigate('/')
      }
      setLoading(false)
    }
    if (receptorId && user) {
      obtenerConversacion({ receptorId })
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Existe una conversacion
    if (conversacion._id && receptorId && user) {
      // Abrir la sala de la conversacion
      socket.emit('/abrir/conversacion/id', conversacion._id)

      // Obtene bloqueos de la conversacion
      socket.on('/bloqueo/conversacion/obtener', (conversacionEmitida) => {
        const conversacionEditado = { ...conversacion, bloqueadoPor: conversacionEmitida.bloqueadoPor, bloqueado: conversacionEmitida.bloqueado }
        setConversacion(conversacionEditado)
      })

      return () => {
        // Salir de la sala al desconectar
        if (socket && socket.connected) {
          socket.emit('/mensaje/salir/conversacion/id', conversacion._id)
        }
      }
    }
  }, [socket, conversacion._id])

  return { loading, conversacion }
}

export default useObtenerConversacion
