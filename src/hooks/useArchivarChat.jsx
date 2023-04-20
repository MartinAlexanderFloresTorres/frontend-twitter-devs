import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_ARCHIVAR_MENSAJES_RECEPTOR } from '../services/api/mensaje'

const useArchivarChat = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const archivarChat = async ({ conversacionId, receptorId }) => {
    setLoading(true)
    try {
      const { data } = await GET_ARCHIVAR_MENSAJES_RECEPTOR({ conversacionId, receptorId })
      toast.success(data.message, { icon: '✅' })
      navigate(`/mensajes`)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { loading, archivarChat }
}

export default useArchivarChat
