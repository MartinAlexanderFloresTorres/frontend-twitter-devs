import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GET_OBTENER_TWEETS_BUSQUEDAD } from '../services/api/tweet'

const useObtenerTweetsBusqueda = ({ q }) => {
  // ESTADOS
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [limit, setLimit] = useState(10)
  const [hasNextPage, setHasNextPage] = useState(true)

  // USE EFFECT
  useEffect(() => {
    const obtenerTweets = async ({ q }) => {
      if (limit === 10) {
        setLoading(true)
      } else if (!hasNextPage) {
        setLoading(true)
        setLimit(10)
      }

      try {
        const { data } = await GET_OBTENER_TWEETS_BUSQUEDAD({ q, page: 1, limit })
        setHasNextPage(data.dataTweets.hasNextPage)
        setUsuarios(data.usuarios)
        setTweets(data.dataTweets.docs)
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
      }
      setLoading(false)
    }

    if (q) {
      obtenerTweets({ q })
    } else {
      setLoading(false)
    }
  }, [q, limit])

  // EDITAR TWEET
  const editarTweet = (tweet) => {
    setTweets(tweets.map((t) => (t._id === tweet._id ? tweet : t)))
  }

  // Siguiente pagina
  const nextPageTweetBusqueda = () => {
    if (hasNextPage) {
      setLimit(limit + 10)
    }
  }

  return { loading, hasNextPage, tweets, nextPageTweetBusqueda, usuarios, editarTweet }
}

export default useObtenerTweetsBusqueda
