import React from 'react'
import useSeguimiento from '../hooks/useSeguimiento'
import useApp from '../hooks/useApp'
import { Link } from 'react-router-dom'
import { LoaderSvg } from '../assets/svgs'

const BotonSeguimiento = ({ id, actualizarPersona }) => {
  // USE SEGUIMIENTO
  const { handleEstadoById, loading } = useSeguimiento({ actualizarPersona })

  // USE APP
  const { user, loadingUser } = useApp()

  if (loadingUser) return null

  if (!user) {
    return (
      <Link to={'/login'} className='btn--2 btn--mb10'>
        Iniciar Sesion
      </Link>
    )
  }

  // Seguido
  const isSeguido = user ? user.seguidos.some((s) => s._id === id) : false

  return (
    <button className={`btn--loader btn--${isSeguido ? '1' : '2'}`} disabled={loading} onClick={() => handleEstadoById({ id })}>
      {loading ? <LoaderSvg /> : isSeguido ? 'Siguiendo' : 'Seguir'}
    </button>
  )
}

BotonSeguimiento.defaultProps = {
  actualizarPersona: () => {}
}

export default BotonSeguimiento
