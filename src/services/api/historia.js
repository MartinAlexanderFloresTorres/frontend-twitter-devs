import clienteAxios from '../../config/ClienteAxios'

// POST CREAR
export const POST_CREAR = async ({ texto, archivo }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (archivo.data.file) {
    formData.append('archivo', archivo.data.file)
    formData.append('tipo', archivo.tipo)
  }

  formData.append('texto', texto)

  return await clienteAxios.post(`/api/historia/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER HISTORIAS SEGUIDORES
export const GET_OBTENER_HISTORIAS_SEGUIDORES = async () => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.get(`/api/historia/seguidores/obtener`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER HISTORIAS USUARIO
export const GET_OBTENER_HISTORIAS_USUARIO = async ({ usuarioId }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.get(`/api/historia/${usuarioId}/obtener`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER HISTORIA
export const GET_OBTENER_HISTORIA = async ({ historiaId }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.get(`/api/historia/${historiaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// POST HEART
export const POST_HEART = async ({ historiaId }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.post(
    `/api/historia/heart/${historiaId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

// DELETE HISTORIA
export const DELETE_HISTORIA = async ({ historiaId }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.delete(`/api/historia/${historiaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET HISTORIA VISTO
export const GET_HISTORIA_VISTO = async ({ historiaId }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.get(`/api/historia/visto/${historiaId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
