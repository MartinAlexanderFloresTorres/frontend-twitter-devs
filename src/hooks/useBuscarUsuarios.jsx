import { useState } from 'react'
import { toast } from 'react-toastify'
import { GET_BUSCAR_USUARIOS } from '../services/api/usuario'

const useBuscarUsuarios = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [usuarios, setUsuarios] = useState([])

  // FUNCIONES
  const buscarUsuario = async ({ q }) => {
    setLoading(true)
    try {
      const { data } = await GET_BUSCAR_USUARIOS({ q })
      setUsuarios(data)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    setLoading(false)
  }

  return { usuarios, loading, buscarUsuario }
}

export default useBuscarUsuarios
