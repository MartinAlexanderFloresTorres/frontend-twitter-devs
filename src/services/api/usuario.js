import clienteAxios from '../../config/ClienteAxios'

// POST CREAR
export const POST_CREAR = async ({ nombre, usuario, nacimiento, email, password }) => {
  return await clienteAxios.post('/api/usuarios', { nombre, usuario, nacimiento, email, password })
}

// POST CONFIRMAR
export const POST_CONFIRMAR = async ({ token }) => {
  return await clienteAxios.post(`/api/usuarios/confirmar/${token}`)
}

// POST LOGIN
export const POST_LOGIN = async ({ email, password }) => {
  return await clienteAxios.post('/api/usuarios/login', { email, password })
}

// POST RECUPERAR
export const POST_RECUPERAR = async ({ email }) => {
  return await clienteAxios.post('/api/usuarios/recuperar', { email })
}

// GET VERIFICAR TOKEN
export const GET_VERIFICAR_TOKEN = async ({ token }) => {
  return await clienteAxios.get(`/api/usuarios/recuperar/${token}`)
}

// GET BUSCAR USUARIO
export const GET_BUSCAR_USUARIOS = async ({ q }) => {
  const token = localStorage.getItem('token-twitter')
  return await clienteAxios.get(`/api/usuarios/buscar?q=${q}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// POST NUEVO PASSWORD
export const POST_NUEVO_PASSWORD = async ({ token, password }) => {
  return await clienteAxios.post(`/api/usuarios/recuperar/${token}`, { password })
}

// GET OBTENER USUARIO
export const GET_OBTENER_USUARIO = async ({ token }) => {
  return await clienteAxios.get('/api/usuarios', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET OBTENER USUARIO HASH
export const GET_OBTENER_USUARIO_HASH = async ({ usuario }) => {
  return await clienteAxios.get(`/api/usuarios/${usuario}`)
}

// POS ACTUALIZAR USUARIO
export const POST_ACTUALIZAR_USUARIO = async ({ id, nombre, usuario, nacimiento, email, avatar, banner, descripcion }) => {
  const formData = new FormData()
  const token = localStorage.getItem('token-twitter')

  if (avatar.file) {
    formData.append('avatar', avatar.file)
  }
  if (banner.file) {
    formData.append('banner', banner.file)
  }

  formData.append('nombre', nombre)
  formData.append('usuario', usuario)
  formData.append('nacimiento', nacimiento)
  formData.append('email', email)
  formData.append('descripcion', descripcion)

  return await clienteAxios.put(`/api/usuarios/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// POST SEGUIDORES
export const POST_SEGUIDORES = async ({ id }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.post(
    `/api/usuarios/seguidores/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

// POST GUARDAR
export const POST_GUARDAR = async ({ id }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.post(
    `/api/usuarios/guardar/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
// GET OBTENER TWEETS GUARDADOS
export const GET_OBTENER_TWEETS_GUARDADOS = async ({ id, limit = 10 }) => {
  const token = localStorage.getItem('token-twitter')

  return await clienteAxios.get(`/api/usuarios/guardados/${id}?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
