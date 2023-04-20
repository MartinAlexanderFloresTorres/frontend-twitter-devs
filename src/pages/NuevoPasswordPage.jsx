import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_VERIFICAR_TOKEN } from '../services/api/usuario'
import Loader from '../components/Loader'
import FormularioPassword from '../components/FormularioPassword'

const NuevoPasswordPage = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [valido, setValido] = useState(false)

  // USE PARAMS
  const { token } = useParams()

  // USE EFFECT
  useEffect(() => {
    const verificarToken = async () => {
      setLoading(true)
      setValido(false)
      try {
        if (!token) return
        await GET_VERIFICAR_TOKEN({ token })
        setValido(true)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelve a intentarlo mas tarde')
        setValido(false)
      }
      setLoading(false)
    }
    verificarToken()
  }, [])

  if (loading) return <Loader />

  if (!valido) return <Navigate to='/' />

  return (
    <div className='main'>
      <FormularioPassword />
    </div>
  )
}

export default NuevoPasswordPage
