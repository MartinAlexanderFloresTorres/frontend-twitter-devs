import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_OBTENER_HISTORIA } from '../services/api/historia'
import useApp from './useApp'

const useObtenerHistoria = ({ historiaId }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [historia, setHistoria] = useState(null)

  // USE APP
  const { handleRecargar } = useApp()

  // USE EFFECT
  useEffect(() => {
    const obtenerHistoriaById = async ({ historiaId }) => {
      setLoading(true)
      setHistoria(null)
      try {
        const { data } = await GET_OBTENER_HISTORIA({ historiaId })
        setHistoria(data)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
        // SINCRONIZAR
        handleRecargar()
      }
      setLoading(false)
    }

    if (historiaId) {
      obtenerHistoriaById({ historiaId })
    }
  }, [historiaId])

  // EDITAR TWEET
  const editarHistoria = (historia) => {
    setHistoria(historia)
  }

  return { loading, historia, editarHistoria }
}

export default useObtenerHistoria
