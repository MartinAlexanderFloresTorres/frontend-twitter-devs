import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_HISTORIA_VISTO } from '../services/api/historia'
import useApp from './useApp'

const useVistoHistoria = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { user, handleRecargar } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE LOCATION
  const location = useLocation()

  // FUNCIONES
  const handleVistoById = async ({ historiaId }) => {
    // Autenticado;
    if (!user) return navigate('/login', { state: location })

    setLoading(true)
    try {
      const { data } = await GET_HISTORIA_VISTO({ historiaId })
      // SINCRONIZAR
      if (data) {
        handleRecargar()
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return { loading, handleVistoById }
}

export default useVistoHistoria
