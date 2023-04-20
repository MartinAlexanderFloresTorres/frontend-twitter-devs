import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useApp from './useApp'
import { GET_CONVERSACIONES_ARCHIVADOS_PREVIEW } from '../services/api/mensaje'

const useObtenerConversacionesArchivadosPrevias = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [conversaciones, setConversaciones] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPageConversacion, setHasNextPageConversacion] = useState(true)

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE APP
  const { user, socket } = useApp()

  const obtenerMensajes = async () => {
    if (page === 1) {
      setLoading(true)
    }
    try {
      const { data } = await GET_CONVERSACIONES_ARCHIVADOS_PREVIEW({ page, limit: 20 })

      setHasNextPageConversacion(data.hasNextPage)
      setConversaciones((prev) => {
        const newConversaciones = [...data.docs]
        const existingConversaciones = new Set(prev.map((conversacion) => conversacion._id))

        return [...prev, ...newConversaciones.filter((conversacion) => !existingConversaciones.has(conversacion._id))]
      })
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      // REDIRECCIONAR
      navigate('/')
    }
    setLoading(false)
  }

  // USE EFFECT
  useEffect(() => {
    obtenerMensajes()
  }, [page])

  useEffect(() => {
    // Existe un usuario
    if (user._id) {
      // Abrir la sala de la conversacion del usuario
      socket.emit('/abrir/conversaciones/usuario', user._id)

      // Obtenes el mensaje de la conversacion del usuario
      socket.on('/usuario/conversaciones/obtener', (conversacionEmitida) => {
        const existe = conversaciones.find((c) => c._id === conversacionEmitida._id)
        if (!existe) {
          // Verificar si el ultimo mensaje no esta vacio para que no se agregue
          if (conversacionEmitida.ultimoMensaje.texto !== '' && !conversacionEmitida.ultimoMensaje.isfoto && !conversacionEmitida.archivadoPor.includes(user._id)) {
            // La conversación no existe en la lista, agregar la nueva conversación
            setConversaciones([conversacionEmitida, ...conversaciones])
          }
        } else {
          // La conversación ya existe en la lista, actualizarla
          setConversaciones(conversaciones.map((c) => (c._id == conversacionEmitida._id ? conversacionEmitida : c)))
        }
      })

      return () => {
        // Salir de la sala al desconectar
        if (socket && socket.connected) {
          socket.emit('/usuario/salir/conversaciones/id', user._id)
        }
      }
    }
  }, [socket, user._id, conversaciones])

  // next page
  const nextPageConversacion = () => {
    if (hasNextPageConversacion) {
      setPage((prev) => prev + 1)
    }
  }

  return { loading, nextPageConversacion, hasNextPageConversacion, conversaciones }
}

export default useObtenerConversacionesArchivadosPrevias
