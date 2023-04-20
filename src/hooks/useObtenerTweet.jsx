import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_OBTENER_TWEET } from '../services/api/tweet'

const useObtenerTweet = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [tweet, setTweet] = useState(null)

  // USE PARAMS
  const { id } = useParams()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE EFFECT
  useEffect(() => {
    const obtenerTweetById = async ({ id }) => {
      setLoading(true)
      try {
        const { data } = await GET_OBTENER_TWEET({ id })
        setTweet(data)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
        // REDIRECCIONAR
        navigate('/')
      }
      setLoading(false)
    }

    if (id) {
      obtenerTweetById({ id })
    } else {
      setLoading(false)
    }
  }, [id])

  return { loading, id, tweet, setTweet }
}

export default useObtenerTweet
