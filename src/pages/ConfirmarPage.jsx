import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POST_CONFIRMAR } from '../services/api/usuario'
import Loader from '../components/Loader'

const ConfirmarPage = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)

  // USE PARAMS
  const { token } = useParams()

  // USE EFFECT
  useEffect(() => {
    const confirmar = async () => {
      setLoading(true)
      try {
        if (!token) return toast.info('Token no valido')
        const { data } = await POST_CONFIRMAR({ token })
        toast.success(data.message)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      }
      setLoading(false)
    }
    confirmar()
  }, [])

  if (loading) return <Loader />

  // RENDER
  return <Navigate to='/login' />
}

export default ConfirmarPage
