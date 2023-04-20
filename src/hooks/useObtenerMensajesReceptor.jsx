import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useApp from './useApp'
import { GET_MENSAJES_RECEPTOR } from '../services/api/mensaje'

const useObtenerMensajesReceptor = ({ conversacionId, receptorId }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [mensajes, setMensajes] = useState([])
  const [conversacion, setConversacion] = useState({})

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE APP
  const { socket } = useApp()

  // USE EFFECT
  useEffect(() => {
    const obtenerMensajes = async ({ receptorId }) => {
      setLoading(true)
      try {
        const { data } = await GET_MENSAJES_RECEPTOR({ conversacionId, receptorId })
        setConversacion(data.conversacion)
        setMensajes(data.mensajes)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
        // REDIRECCIONAR
        navigate('/mensajes')
      }
      setLoading(false)
    }

    if (receptorId) {
      obtenerMensajes({ receptorId })
    } else {
      setLoading(false)
    }
  }, [receptorId])

  useEffect(() => {
    // Existe una conversacion
    if (conversacion._id) {
      // Abrir la sala de la conversacion
      socket.emit('/abrir/conversacion/id', conversacionId)

      // Obtenes el mensaje de la conversacion
      socket.on('/mensaje/conversacion/obtener', (mensaje) => {
        setMensajes((prev) => [...prev, mensaje])
      })

      // Obtene bloqueos de la conversacion
      socket.on('/bloqueo/conversacion/obtener', (conversacionEmitida) => {
        const conversacionEditado = { ...conversacion, bloqueadoPor: conversacionEmitida.bloqueadoPor, bloqueado: conversacionEmitida.bloqueado }
        setConversacion(conversacionEditado)
      })

      // Obtene mensajes recientes de la conversacion
      socket.on('/eliminar/conversacion/obtener', (mensajes) => {
        setMensajes(mensajes)
      })

      return () => {
        // Salir de la sala al desconectar
        if (socket && socket.connected) {
          socket.emit('/mensaje/salir/conversacion/id', conversacionId)
        }
      }
    }
  }, [conversacionId, socket, conversacion._id])

  return { loading, mensajes, conversacion }
}

export default useObtenerMensajesReceptor
