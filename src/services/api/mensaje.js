import clienteAxios from '../../config/ClienteAxios'

// POST CREAR
export const POST_CREAR = async ({ receptor, mensaje, foto }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (foto.file) {
    formData.append('foto', foto.file)
  }

  formData.append('mensaje', mensaje)

  return await clienteAxios.post(`/api/mensaje/${receptor}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER MENSAJES RECEPTOR
export const GET_MENSAJES_RECEPTOR = async ({ conversacionId, receptorId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/mensaje/chat/${conversacionId}/${receptorId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER CONVERSACION
export const GET_CONVERSACION = async ({ receptorId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/mensaje/conversacion/${receptorId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
// GET OBTENER CONVERSACIONES PREVIOS
export const GET_CONVERSACIONES_PREVIEW = async ({ page = 1, limit = 10 }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/mensaje/previos?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// DELETE OBTENER MENSAJES RECEPTOR
export const DELETE_MENSAJES_RECEPTOR = async ({ conversacionId, receptorId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.delete(`/api/mensaje/chat/${conversacionId}/${receptorId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET ARCHIVAR MENSAJES RECEPTOR
export const GET_ARCHIVAR_MENSAJES_RECEPTOR = async ({ conversacionId, receptorId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/mensaje/chat/archivar/${conversacionId}/${receptorId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER CONVERSACIONES ARCHIVADOS PREVIOS
export const GET_CONVERSACIONES_ARCHIVADOS_PREVIEW = async ({ page = 1, limit = 10 }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/mensaje/archivados/previos?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET BLOQUEAR MENSAJES RECEPTOR
export const GET_BLOQUEAR_MENSAJES_RECEPTOR = async ({ conversacionId, receptorId }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/mensaje/chat/bloquear/${conversacionId}/${receptorId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
