import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_OBTENER_TWEETS } from '../services/api/tweet'

const useObtenerTweets = () => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  // USE EFFECT
  useEffect(() => {
    const obtenerTweets = async () => {
      if (page === 1) {
        setLoading(true)
      }

      try {
        const { data } = await GET_OBTENER_TWEETS({ page, limit: 10 })
        setHasNextPage(data.hasNextPage)
        setTweets((prev) => {
          const newTweets = [...data.docs]
          const existingTweets = new Set(prev.map((tweet) => tweet._id))

          return [...prev, ...newTweets.filter((tweet) => !existingTweets.has(tweet._id))]
        })
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      }
      setLoading(false)
    }

    obtenerTweets()
  }, [page])

  // AGREGAR TWEET
  const agregarTweet = (tweet) => {
    setTweets((prev) => [tweet, ...prev])
  }

  // ELIMINAR TWEET
  const eliminarTweet = ({ id }) => {
    setTweets((prev) => prev.filter((t) => t._id !== id))
  }

  // EDITAR TWEET
  const editarTweet = (tweet) => {
    setTweets(tweets.map((t) => (t._id === tweet._id ? tweet : t)))
  }

  // Siguiente pagina
  const nextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1)
    }
  }

  return { loading, tweets, nextPage, hasNextPage, agregarTweet, eliminarTweet, editarTweet }
}

export default useObtenerTweets
