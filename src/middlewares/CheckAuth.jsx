import { useEffect } from 'react'
import useApp from '../hooks/useApp'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const CheckAuth = ({ children }) => {
  // USE APP
  const { user, loadingUser } = useApp()

  // USE LOCATION
  const location = useLocation()

  // USE NAVIGATE
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && !loadingUser) navigate('/login', { state: location })
  }, [location.pathname])

  if (loadingUser)
    return (
      <section className='principal principal--mensajes'>
        <div className='cabezera cabezera--flotante justify-between'>
          <div className='flex w-full'>
            <div className='titulo flex w-full justify-start'>
              <div className='l-item--loader' style={{ width: '50%', height: 35 }}></div>
            </div>
          </div>
        </div>
      </section>
    )

  if (!user) return <Navigate to={'/login'} state={location} />

  return children
}

export default CheckAuth
