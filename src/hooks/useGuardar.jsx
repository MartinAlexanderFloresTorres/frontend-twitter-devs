import { useState } from 'react'
import { toast } from 'react-toastify'
import { POST_GUARDAR } from '../services/api/usuario'
import useApp from './useApp'
import { useLocation, useNavigate } from 'react-router-dom'

const useGuardar = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { user, login } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE LOCATION
  const location = useLocation()

  // FUNCIONES
  const handleGuardarById = async ({ id }) => {
    // Autenticado
    if (!user) return navigate('/login', { state: location })

    setLoading(true)
    try {
      const { data } = await POST_GUARDAR({ id })

      toast.success(data.message, { icon: '📁' })
      // SINCRONIZAR
      login(data.usuario)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return { loading, handleGuardarById }
}

export default useGuardar
