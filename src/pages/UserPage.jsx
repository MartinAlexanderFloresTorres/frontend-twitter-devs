import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Tweets from '../components/Tweets'
import FormularioMensaje from '../components/FormularioMensaje'
import BotonSeguimiento from '../components/botonSeguimiento'
import BotonBloqueamiento from '../components/BotonBloqueamiento'
import useApp from '../hooks/useApp'
import useObtenerUsuario from '../hooks/useObtenerUsuario'
import useObtenerTweetsPersona from '../hooks/useObtenerTweetsPersona'
import { CakeSvg, CalendarDaysSvg, ChevronLeftSvg } from '../assets/svgs'
import formaterFecha from '../helpers/formaterFecha'
import UserLoader from '../components/animations/UserLoader'
import { useEffect, useState } from 'react'
import ModalImagen from '../components/ModalImagen'

const UserPage = () => {
  // ESTADOS
  const [modalImagen, setModalImagen] = useState(false)
  const [foto, setFoto] = useState('')

  // USE APP
  const { user } = useApp()

  // USE PARAMS
  const { usuario } = useParams()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE OBTENER USUARIO
  const { persona, actualizarPersona, loading: loadingPersona } = useObtenerUsuario()

  // USE OBTENER TWEETS DE PERSONA
  const { tweets, setTweets, setLoading, setTotalDocs, setPage, totalDocs, loading: loadingTweets, nextPage, hasNextPage, editarTweet } = useObtenerTweetsPersona({ creador: persona?._id })

  // HANDLE MODAL OPCIONES
  const handleModalImagen = (foto) => {
    setFoto(foto)
    setModalImagen(!modalImagen)
  }

  useEffect(() => {
    setLoading(true)
    setTweets([])
    setTotalDocs(0)
    setPage(1)
  }, [usuario, persona])

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante padding-10'>
        <Link to='/' className='flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        {loadingPersona ? <div className='l-item--loader' style={{ width: '50%', height: 25 }}></div> : <h1 className='titulo'>{persona.nombre}</h1>}
      </div>

      <div className='main'>
        {loadingPersona ? (
          <UserLoader />
        ) : (
          <div className='usuario'>
            <img className='usuario__banner cursor-pointer' onClick={() => handleModalImagen(persona.banner.secure_url)} src={persona.banner.secure_url} alt={`${persona.nombre}-banner`} />

            <div className='usuario__top'>
              <button className='usuario__top--avatar flex' onClick={() => handleModalImagen(persona.avatar.secure_url)}>
                <Avatar user={persona} />
              </button>

              {user?.usuario === persona.usuario ? (
                <>
                  <Link to={`/user/editar/${persona.usuario}`} className='btn--editar'>
                    Editar perfil
                  </Link>
                </>
              ) : (
                user && <BotonBloqueamiento persona={persona} callback={() => navigate('/mensajes')} />
              )}
            </div>

            <div className='usuario__informacion'>
              <h2 className='nombre webkit-box-1'>{persona.nombre}</h2>

              <Link to={`/user/${persona.usuario}`} className='usuario'>
                {persona.usuario}
              </Link>

              {user?.usuario !== persona.usuario && <BotonSeguimiento id={persona._id} actualizarPersona={actualizarPersona} />}

              <p className='descripcion'>{persona.descripcion}</p>

              <div className='calendario'>
                <CalendarDaysSvg />
                <p>Creado el {formaterFecha(persona.createdAt)}</p>
              </div>

              <div className='calendario'>
                <CakeSvg />
                <p>Nacio el {formaterFecha(persona.nacimiento)}</p>
              </div>

              {user && (
                <div className='indicadores'>
                  <Link to={`/seguidores/${persona.usuario}`}>
                    <b>{persona.seguidores.length} </b>
                    Seguidores
                  </Link>
                  <Link to={`/siguiendo/${persona.usuario}`}>
                    <b>{persona.seguidos.length} </b>Siguiendo
                  </Link>
                </div>
              )}
            </div>

            {user && user?.usuario !== persona.usuario && user?.bloqueadoPor?.length === 0 && persona?.bloqueadoPor?.length === 0 && <FormularioMensaje receptor={persona._id} />}
          </div>
        )}

        {!loadingPersona && persona && (
          <div>
            <h2 className='usuario__tweets'>
              Tweets <span>{totalDocs}</span>
            </h2>
            <Tweets tweets={tweets} nextPage={nextPage} hasNextPage={hasNextPage} actualizarTweet={editarTweet} loading={loadingTweets} />
          </div>
        )}
      </div>

      {modalImagen && <ModalImagen handleModal={handleModalImagen} url={foto} />}
    </section>
  )
}

export default UserPage
