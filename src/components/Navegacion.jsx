import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Avatar from './Avatar'
import useApp from '../hooks/useApp'
import Indicador from './Indicador'
import Modal from './Modal'
import Buscador from './Buscador'
import { ArrowLeftOnRectangleSvg, BellSvg, BookmarkSquareSvg, MessengerSvg, HomeSvg, PencilSquareSvg, PencilSvg, UserSvg, EllipsisVerticalSvg, MagnifyingGlassSvg, LogoSvg } from '../assets/svgs'

const Navegacion = () => {
  // ESTADOS
  const [modalOpciones, setModalOpciones] = useState(false)
  // ESTADOS
  const [modalBusqueda, setModalBusqueda] = useState(false)

  // USE APP
  const { user, logout, notificacionesNoLeidas } = useApp()

  // USE LOCATION
  const { pathname } = useLocation()

  // HANDLE  MODAL OPCIONES
  const handleModalOpciones = () => setModalOpciones(!modalOpciones)

  // HANDLE  MODAL BUSQUEDA
  const handleModalBusqueda = () => setModalBusqueda(!modalBusqueda)

  return (
    <>
      <section className={`navegacion ${pathname.includes('/conversacion/') ? 'navegacion__hidden' : ''}`}>
        <Link to='/' className='logo flex'>
          <LogoSvg />
          <span>Devs</span>
        </Link>

        <section className='navegacion__center'>
          <nav className='navegacion__items'>
            <Link className={`navegacion__items__item ${pathname === '/' ? 'active' : ''}`} to={'/'}>
              <HomeSvg />
              <span>Inicio</span>
            </Link>

            <button className={`navegacion__items__item ${pathname === '/busqueda' ? 'active' : ''}`} onClick={handleModalBusqueda}>
              <MagnifyingGlassSvg />
              <span>Buscar</span>
            </button>

            {user && (
              <>
                <Link className={`navegacion__items__item ${pathname === '/notificaciones' ? 'active' : ''}`} to={'/notificaciones'}>
                  <Indicador longitud={notificacionesNoLeidas}>
                    <BellSvg />
                  </Indicador>
                  <span>Notificaciones</span>
                </Link>

                <Link className={`navegacion__items__item ${pathname === '/mensajes' ? 'active' : ''}`} to={'/mensajes'}>
                  <MessengerSvg />
                  <span>Mensajes</span>
                </Link>

                <Link className={`navegacion__items__item ${pathname === '/guardados' ? 'active' : ''}`} to={'/guardados'}>
                  <BookmarkSquareSvg />
                  <span>Guardados</span>
                </Link>

                <Link className={`navegacion__items__item ${pathname === `/user/${user.usuario}` ? 'active' : ''} navegacion__items__itemHidden`} to={`/user/${user.usuario}`}>
                  <img className='user__img' src={user.avatar.secure_url} alt={user.nombre} />
                  <span>Perfil</span>
                </Link>

                <button className={`navegacion__items__item ${pathname === `/user/${user.usuario}` ? 'active' : ''} navegacion__items__itemHiddenOpciones`} onClick={handleModalOpciones}>
                  <img className='user__img' src={user.avatar.secure_url} alt={user.nombre} />
                </button>
              </>
            )}
          </nav>

          {user && (
            <Link to={'/tweet/new'} className='tweet--btn btn btn--full btn--primary'>
              <span>tweet</span>
              <PencilSvg />
            </Link>
          )}
        </section>

        {!user && (
          <div className='botones botones--column'>
            <Link to={'/registro'} className='tweet--btn btn btn--full btn--oscuro'>
              <span>Crear cuenta</span>
              <PencilSquareSvg />
            </Link>

            <Link to={'/login'} className='tweet--btn btn btn--full btn--primary'>
              <span>Iniciar Sesion</span>
              <ArrowLeftOnRectangleSvg />
            </Link>
          </div>
        )}

        {user && (
          <div className='btn btn--oscuroo navegacion__perfil navegacion__perfil--hidden'>
            <Avatar user={user} />

            <div>
              <Link to={`/user/${user.usuario}`}>
                <p>{user.nombre}</p>
              </Link>
              <Link to={`/user/${user.usuario}`}>
                <span>{user.usuario}</span>
              </Link>
            </div>
            <button className='btn--hover' onClick={handleModalOpciones}>
              <EllipsisVerticalSvg />
            </button>
          </div>
        )}
      </section>

      {modalOpciones && user && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} cabezera={false} cuerpoClass={'no-padding'} center centerClass={'w-400 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalOpciones}>
          <button className='flex navegacion__perfil btn--5 no-margin border-b w-full' onClick={handleModalOpciones}>
            <Avatar user={user} />
            <div>
              <Link to={`/user/${user.usuario}`}>
                <p>{user.nombre}</p>
              </Link>
              <Link to={`/user/${user.usuario}`}>
                <span>{user.usuario}</span>
              </Link>
            </div>
          </button>
          <Link to='/tweet/new' className='btn--5  border-b w-full text-azul' onClick={handleModalOpciones}>
            Nuevo Tweet
          </Link>
          <Link to={`/user/editar/${user.usuario}`} className='btn--5  border-b w-full text-azul' onClick={handleModalOpciones}>
            Editar Perfil
          </Link>
          <Link to={`/seguidores/${user.usuario}`} className='btn--5  border-b w-full text-azul' onClick={handleModalOpciones}>
            Seguidores
          </Link>
          <Link to={`/siguiendo/${user.usuario}`} className='btn--5  border-b w-full text-azul' onClick={handleModalOpciones}>
            Siguiendo
          </Link>
          <button
            onClick={() => {
              logout()
              handleModalOpciones()
            }}
            className='flex btn--full btn--5 text-rojo'
          >
            <span>Cerrar Sesion</span>
          </button>
        </Modal>
      )}

      {modalBusqueda && (
        <Modal fondo={'rgba(16, 16, 16, 0.707)'} cabezera={false} cuerpoClass={'no-padding'} center centerClass={'w-600 mx-auto'} maxWidth={'100%'} fondoContainer={'var(--oscuro-2)'} handleClose={handleModalBusqueda}>
          <Buscador autoFocus callback={handleModalBusqueda} />
        </Modal>
      )}
    </>
  )
}

export default Navegacion
