import clienteAxios from '../../config/ClienteAxios'

// GET OBTENER COMENTARIOS
export const GET_OBTENER_COMENTARIOS = async ({ tweetId }) => {
  return await clienteAxios.get(`/api/comentario/${tweetId}`)
}

// GER OBTENER TWEET
export const GET_OBTENER_COMENTARIO = async ({ id }) => {
  return await clienteAxios.get(`/api/comentario/${id}`)
}

// POST COMENTARIO
export const POST_COMENTARIO = async ({ tweetId, texto, foto, menciones }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (foto?.file) {
    formData.append('foto', foto.file)
  }

  formData.append('texto', texto)
  formData.append('menciones', menciones)

  return await clienteAxios.post(`/api/comentario/${tweetId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// DELETE COMENTARIO
export const DELETE_COMENTARIO = async ({ tweetId, comentarioId }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.delete(`/api/comentario/${comentarioId}/${tweetId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// PUT COMENTARIO
export const PUT_COMENTARIO = async ({ tweetId, comentarioId, texto, eliminado, foto, mencionesIds }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (foto?.file) {
    formData.append('foto', foto.file)
  }

  formData.append('eliminado', eliminado)
  formData.append('texto', texto)
  formData.append('menciones', mencionesIds)

  return await clienteAxios.put(`/api/comentario/${comentarioId}/${tweetId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
