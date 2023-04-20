import { useState } from 'react'
import { toast } from 'react-toastify'
import { POST_SEGUIDORES } from '../services/api/usuario'
import useApp from './useApp'
import { useLocation, useNavigate } from 'react-router-dom'

const useSeguimiento = ({ actualizarPersona }) => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { user, login, socket } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE LOCATION
  const location = useLocation()

  // FUNCIONES
  const handleEstadoById = async ({ id }) => {
    // Autenticado
    if (!user) return navigate('/login', { state: location })

    setLoading(true)
    try {
      const { data } = await POST_SEGUIDORES({ id })

      toast.success(data.message, { icon: '📬' })
      // SINCRONIZAR
      actualizarPersona(data.persona)
      login(data.usuario)

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

  return { loading, handleEstadoById }
}

export default useSeguimiento
