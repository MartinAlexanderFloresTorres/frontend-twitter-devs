import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DELETE_TWEET } from '../services/api/tweet'
import useApp from './useApp'

const useEliminarTweet = () => {
  // ESTADOS
  const [loading, setLoading] = useState(false)

  // USE APP
  const { eliminarTweet } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  const eliminarTweetById = async ({ id, callback = () => {} }) => {
    setLoading(true)

    try {
      const { data } = await DELETE_TWEET({ id })
      toast.success(data.message, { icon: '✅' })
      // SINCRONIZAR
      eliminarTweet({ id })
      callback()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    // REDIRECCIONAR
    navigate('/')
    setLoading(false)
  }

  return { loading, eliminarTweetById }
}

export default useEliminarTweet
