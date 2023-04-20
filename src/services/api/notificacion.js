import clienteAxios from '../../config/ClienteAxios'

// POST CREAR
export const POST_CREAR = async ({ usuarioId, texto, link, nombreLink }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.post(
    `/api/notificacion/${usuarioId}`,
    { texto, link, nombreLink },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

// GET CREAR
export const GET_OBTENER = async ({ page = 1, limit = 10 }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/notificacion?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET ESTADO
export const GET_ESTADO = async ({ notificacionId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/notificacion/estado/${notificacionId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// DELETE NOTIFICACION
export const DELETE_NOTIFICACION = async ({ notificacionId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.delete(`/api/notificacion/${notificacionId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
// DELETE NOTIFICACIONES
export const DELETE_NOTIFICACIONES = async () => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.delete(`/api/notificacion/eliminar/todas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET NOTIFICACIONES VISTAS TODAS
export const GET_NOTIFICACIONES_VISTAS_TODAS = async () => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/notificacion/vistos/todas`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
