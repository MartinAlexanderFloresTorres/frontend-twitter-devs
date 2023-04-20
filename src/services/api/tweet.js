import clienteAxios from '../../config/ClienteAxios'

// POST CREAR
export const POST_CREAR = async ({ descripcion, foto, hashtags, menciones }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (foto?.file) {
    formData.append('foto', foto.file)
  }

  formData.append('descripcion', descripcion)
  formData.append('hashtags', hashtags)
  formData.append('menciones', menciones)

  return await clienteAxios.post(`/api/tweet`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER TWEETS
export const GET_OBTENER_TWEETS = async ({ page = 1, limit = 10 }) => {
  return await clienteAxios.get(`/api/tweet?page=${page}&limit=${limit}`)
}

// GET OBTENER TWEETS
export const GET_OBTENER_TWEETS_BUSQUEDAD = async ({ q, page = 1, limit = 10 }) => {
  return await clienteAxios.get(`/api/tweet/busqueda/query?q=${q}&page=${page}&limit=${limit}`)
}

// GER OBTENER TWEET
export const GET_OBTENER_TWEET = async ({ id }) => {
  return await clienteAxios.get(`/api/tweet/${id}`)
}

// DELETE TWEET
export const DELETE_TWEET = async ({ id }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.delete(`/api/tweet/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// PUT EDITAR
export const PUT_EDITAR = async ({ id, descripcion, eliminado, foto, hashtags, menciones }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (foto?.file) {
    formData.append('foto', foto.file)
  }
  formData.append('eliminado', eliminado)
  formData.append('descripcion', descripcion)
  formData.append('hashtags', hashtags)
  formData.append('menciones', menciones)

  return await clienteAxios.put(`/api/tweet/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER TWEETS PERSONA
export const GET_OBTENER_TWEETS_PERSONA = async ({ creador, page = 1, limit = 10 }) => {
  return await clienteAxios.get(`/api/tweet/user/${creador}?page=${page}&limit=${limit}`)
}

// POST HEARTS
export const POST_HEARTS = async ({ id }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.post(
    `/api/tweet/hearts/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
// POST RETWEET CREAR
export const POST_RETWEET_CREAR = async ({ twetId, descripcion, foto, hashtags, menciones }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (foto?.file) {
    formData.append('foto', foto.file)
  }

  formData.append('descripcion', descripcion)
  formData.append('hashtags', hashtags)
  formData.append('menciones', menciones)

  return await clienteAxios.post(`/api/tweet/re-tweet/${twetId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
