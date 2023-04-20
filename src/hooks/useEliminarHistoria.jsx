import { useState } from 'react'
import { toast } from 'react-toastify'
import { DELETE_HISTORIA } from '../services/api/historia'
import useApp from './useApp'

const useEliminarHistoria = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { handleRecargar } = useApp()

  const eliminarHistoriaById = async ({ historiaId, handleCloseModal }) => {
    setLoading(true)
    try {
      // CERRAR EL MODAL
      handleCloseModal()
      await toast.promise(DELETE_HISTORIA({ historiaId }), {
        pending: 'Eliminando historia...',
        success: 'Historia eliminada ✅',
        error: 'Error al eliminar 🤯'
      })
      // SINCRONIZAR
      handleRecargar()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return { loading, eliminarHistoriaById }
}

export default useEliminarHistoria
