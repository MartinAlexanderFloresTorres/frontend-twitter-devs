import { Outlet, useLocation } from 'react-router-dom'
import Navegacion from '../components/Navegacion'
import BarraLateral from '../components/BarraLateral'

const Layout = () => {
  // USE LOCATION
  const { pathname } = useLocation()

  return (
    <main className={`container main-container ${pathname.includes('/conversacion/') ? 'main-container--noPadding' : ''}`}>
      <Navegacion />

      <Outlet />

      <BarraLateral />
    </main>
  )
}

export default Layout
