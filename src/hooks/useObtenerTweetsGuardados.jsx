import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useApp from './useApp'
import { GET_OBTENER_TWEETS_GUARDADOS } from '../services/api/usuario'

const useObtenerTweetsGuardados = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [limit, setLimit] = useState(10)
  const [hasNextPage, setHasNextPage] = useState(true)

  // USE APP
  const { user } = useApp()

  // USE EFFECT
  useEffect(() => {
    const obtenerTweetsGuardados = async ({ id }) => {
      if (limit === 10) {
        setLoading(true)
      }

      try {
        const { data } = await GET_OBTENER_TWEETS_GUARDADOS({ id, limit })
        setTweets(data.reverse())

        if (tweets.length === data.length) {
          setHasNextPage(false)
        } else {
          setHasNextPage(true)
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      }
      setLoading(false)
    }

    if (user) {
      obtenerTweetsGuardados({ id: user._id })
    } else {
      setLoading(false)
    }
  }, [user, limit])

  // EDITAR TWEET
  const editarTweet = (tweet) => {
    setTweets(tweets.map((t) => (t._id === tweet._id ? tweet : t)))
  }

  // Siguiente pagina
  const nextPage = () => {
    if (hasNextPage) {
      setLimit(limit + 10)
    }
  }

  return { loading, nextPage, hasNextPage, tweets, editarTweet }
}

export default useObtenerTweetsGuardados
