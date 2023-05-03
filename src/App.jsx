import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppProvider from './providers/AppProvider'
import Layout from './layouts/Layout'
import CheckAuth from './middlewares/CheckAuth'

const HomePage = lazy(() => import('./pages/HomePage'))
const TweetPage = lazy(() => import('./pages/TweetPage'))
const UserPage = lazy(() => import('./pages/UserPage'))
const SeguidoresPage = lazy(() => import('./pages/SeguidoresPage'))
const SiguiendoPage = lazy(() => import('./pages/SiguiendoPage'))
const NotificacionesPage = lazy(() => import('./pages/NotificacionesPage'))
const MensajesPage = lazy(() => import('./pages/MensajesPage'))
const GuardadosPage = lazy(() => import('./pages/GuardadosPage'))
const BusquedadPage = lazy(() => import('./pages/BusquedadPage'))
const SuperMensajesPage = lazy(() => import('./pages/SuperMensajesPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegistroPage = lazy(() => import('./pages/RegistroPage'))
const RecuperacionPage = lazy(() => import('./pages/RecuperacionPage'))
const EditarPerfilPage = lazy(() => import('./pages/EditarPerfilPage'))
const NuevoTweetPage = lazy(() => import('./pages/NuevoTweetPage'))
const EditarTweetPage = lazy(() => import('./pages/EditarTweetPage'))
const ConfirmarPage = lazy(() => import('./pages/ConfirmarPage'))
const NuevoPasswordPage = lazy(() => import('./pages/NuevoPasswordPage'))
const MensajesArchivadosPage = lazy(() => import('./pages/MensajesArchivadosPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Suspense fallbac={null}>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/tweet/:id' element={<TweetPage />} />
                <Route path='/tweet/new' element={<CheckAuth children={<NuevoTweetPage />} />} />
                <Route
                  path='/tweet/editar/:id'
                  element={<CheckAuth children={<EditarTweetPage />} />}
                />
                <Route path='/user/:usuario' element={<UserPage />} />
                <Route path='/seguidores/:usuario' element={<SeguidoresPage />} />
                <Route path='/siguiendo/:usuario' element={<SiguiendoPage />} />
                <Route
                  path='/notificaciones'
                  element={<CheckAuth children={<NotificacionesPage />} />}
                />
                <Route path='/mensajes' element={<CheckAuth children={<MensajesPage />} />} />
                <Route
                  path='/mensajes/archivados'
                  element={<CheckAuth children={<MensajesArchivadosPage />} />}
                />
                <Route
                  path='/conversacion/:conversacionId/mensajes/:emisorId/:receptorId'
                  element={<CheckAuth children={<SuperMensajesPage />} />}
                />
                <Route path='/guardados' element={<CheckAuth children={<GuardadosPage />} />} />
                <Route path='/busqueda' element={<BusquedadPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/registro' element={<RegistroPage />} />
                <Route path='/confirmar/:token' element={<ConfirmarPage />} />
                <Route path='/recuperacion' element={<RecuperacionPage />} />
                <Route path='/recuperacion/:token' element={<NuevoPasswordPage />} />
                <Route
                  path='/user/editar/:usuario'
                  element={<CheckAuth children={<EditarPerfilPage />} />}
                />
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </AppProvider>
      </BrowserRouter>

      <ToastContainer
        position='bottom-right'
        limit={6}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='dark'
      />
    </>
  )
}

export default App
