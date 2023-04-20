import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_OBTENER_TWEETS_PERSONA } from '../services/api/tweet'

const useObtenerTweetsPersona = ({ creador }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [totalDocs, setTotalDocs] = useState(0)

  // USE EFFECT
  useEffect(() => {
    const obtenerTweets = async ({ creador }) => {
      if (page === 1) {
        setLoading(true)
      }

      try {
        const { data } = await GET_OBTENER_TWEETS_PERSONA({ page, limit: 10, creador })
        setTotalDocs(data.totalDocs)
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

    if (creador) {
      obtenerTweets({ creador })
    }
  }, [creador, page])

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
  return { totalDocs, loading, setLoading, setPage, setTweets, setTotalDocs, nextPage, hasNextPage, tweets, editarTweet }
}

export default useObtenerTweetsPersona
