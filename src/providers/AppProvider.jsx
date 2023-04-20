import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { GET_OBTENER_USUARIO } from '../services/api/usuario'
import useObtenerTweets from '../hooks/useObtenerTweets'
import useObtenerNotificaciones from '../hooks/useObtenerNotificaciones'
import generarTitulo from '../helpers/generarTitulo'
import useObtenerHistoriasSeguidores from '../hooks/useObtenerHistoriasSeguidores'

export const AppContext = createContext()

// SOCKET GLOBAL
const socket = io(import.meta.env.VITE_BACKEND_URL)

const AppProvider = ({ children }) => {
  // ESTADOS
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(0)
  const [conectados, setConectados] = useState([])
  const [modalHistoria, setModalHistoria] = useState(false)

  // USE OBTENER TWEETS
  const { tweets, nextPage, hasNextPage, agregarTweet, eliminarTweet, editarTweet, loading: loadingTweets } = useObtenerTweets()

  // USE OBTENER HISTORIAS SEGUIDORES
  const { historias, handleRecargar, loading: loadingHistorias } = useObtenerHistoriasSeguidores({ user })

  // USE LOCATION
  const { pathname } = useLocation()

  // USE OBTENER NOTIFICICACIONES
  const { notificaciones, nextPageNotificacion, hasNextPageNotificacion, setNotificaciones, handleNotificacion, loading: loadingNotificacion } = useObtenerNotificaciones({ socket, user })

  // EFFECTO DE TITULO DINAMICO
  useEffect(() => {
    // establece el título de la página con el título generado o un título predeterminado si no hay ningún título generado
    document.querySelector('html head title').textContent = generarTitulo({ pathname }) || 'Twitter Devs '
    // SCROLL TOP 0
    window.scrollTo({ top: 0 })
  }, [pathname])

  // USE EFFECT PARA OBTENER USUARIO
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (usuario) {
      setUser(usuario)
    }

    const token = localStorage.getItem('token-twitter')
    if (token) {
      obtenerUsuario({ token })
    } else {
      setLoadingUser(false)
    }
  }, [])

  // EFECTO PARA OBTENER LAS NOTIFICACION NO LEIDAS
  useEffect(() => {
    if (notificaciones.length > 0) {
      filtrarNotificacionNoLeidas(notificaciones)
    } else {
      setNotificacionesNoLeidas(0)
      document.querySelector("html head link[rel='shortcut icon']").href = '/logo.ico'
    }
  }, [notificaciones])

  // EFECTO PARA OBTENER LOS USUARIOS CONECTADOS
  useEffect(() => {
    socket.on('/estados/usuarios/conectados', (data) => {
      setConectados(data)
    })
  }, [])

  const obtenerUsuario = async ({ token }) => {
    setLoadingUser(true)
    try {
      const { data } = await GET_OBTENER_USUARIO({ token })
      // SINCRONIZAR EL ESTADO
      login(data.usuario)
    } catch (error) {
      console.log(error)
      // ELIMINAR EL TOKEN
      localStorage.removeItem('token-twitter')
      // ELIMINAR EL USUARIO
      localStorage.removeItem('usuario')
    }
    setLoadingUser(false)
  }

  const filtrarNotificacionNoLeidas = (notificaciones) => {
    const noLeidas = notificaciones.filter((n) => !n.visto)
    if (noLeidas.length > 0) {
      document.querySelector("html head link[rel='shortcut icon']").href = '/logo-notificacion.ico'
    } else {
      document.querySelector("html head link[rel='shortcut icon']").href = '/logo.ico'
    }
    setNotificacionesNoLeidas(noLeidas.length)
  }

  // FUNCIONES
  const login = (user) => {
    if (user) {
      if (user.suspendido) {
        toast.warn('Estas suspendido')
      }
      setUser(user)
      // CONECTAR AL USUARIO
      socket.connect()
      // CONECTAR AL USUARIO
      socket.emit('/estados/usuarios/conectar', user._id)
      // GUARDAR EL USUARIO EN LOCALSTORAGE
      localStorage.setItem('usuario', JSON.stringify(user))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token-twitter')
    localStorage.removeItem('usuario')
    socket.disconnect()
    setNotificacionesNoLeidas(0)
    setNotificaciones([])
    setModalHistoria(false)
  }

  // HANDLE MODAL HISTORIA
  const handleAbrirModalHistoria = () => setModalHistoria(true)
  const handleCerrarModalHistoria = () => setModalHistoria(false)

  return (
    <AppContext.Provider
      value={{
        conectados,
        socket,
        user,
        loadingUser,
        login,
        logout,
        historias,
        handleRecargar,
        modalHistoria,
        handleAbrirModalHistoria,
        handleCerrarModalHistoria,
        loadingHistorias,
        tweets,
        nextPage,
        hasNextPage,
        loadingTweets,
        agregarTweet,
        eliminarTweet,
        editarTweet,
        notificaciones,
        setNotificaciones,
        nextPageNotificacion,

        hasNextPageNotificacion,

        handleNotificacion,
        loadingNotificacion,
        notificacionesNoLeidas
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
