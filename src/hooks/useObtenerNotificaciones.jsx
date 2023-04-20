import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_OBTENER } from '../services/api/notificacion'

const useObtenerNotificaciones = ({ user, socket }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [notificaciones, setNotificaciones] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPageNotificacion, setHasNextPageNotificacion] = useState(true)

  const obtenerNotificaciones = async () => {
    if (page === 1) {
      setLoading(true)
    }
    try {
      const { data } = await GET_OBTENER({ page, limit: 16 })
      setHasNextPageNotificacion(data.hasNextPage)
      setNotificaciones((prev) => {
        const newNotificaciones = [...data.docs]
        const existingNotificaciones = new Set(prev.map((notificacion) => notificacion._id))

        return [...prev, ...newNotificaciones.filter((notificacion) => !existingNotificaciones.has(notificacion._id))]
      })
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  // USE EFFECT
  useEffect(() => {
    if (user) {
      obtenerNotificaciones()
    } else {
      setLoading(false)
    }
  }, [user?._id, page])

  useEffect(() => {
    // Existe un usuario
    if (user?._id) {
      // Abrir la sala de las notifiaciones del usuario
      socket.emit('/abrir/notificaciones/usuario', user._id)

      // Obtenes el mensaje de las notifiaciones del usuario
      socket.on('/usuario/notificaciones/obtener', (notificacionEmitida) => {
        // Agregar la nueva notificacion
        setNotificaciones([notificacionEmitida, ...notificaciones])
      })

      return () => {
        // Salir de la sala al desconectar
        if (socket && socket.connected) {
          socket.emit('/usuario/salir/notificaciones/id', user._id)
        }
      }
    }
  }, [socket, user, notificaciones])

  // EDITAR NOTIFICACION
  const handleNotificacion = (notificacion, eliminar) => {
    if (eliminar) {
      setNotificaciones(notificaciones.filter((n) => n._id !== notificacion._id))
    } else {
      setNotificaciones(notificaciones.map((n) => (n._id === notificacion._id ? notificacion : n)))
    }
  }

  // next page
  const nextPageNotificacion = () => {
    if (hasNextPageNotificacion) {
      setPage((prev) => prev + 1)
    }
  }

  return { loading, notificaciones, nextPageNotificacion, hasNextPageNotificacion, setNotificaciones, handleNotificacion }
}

export default useObtenerNotificaciones
