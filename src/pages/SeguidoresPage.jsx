import { Link } from 'react-router-dom'
import { ChevronLeftSvg } from '../assets/svgs'
import Usuarios from '../components/Usuarios'
import useObtenerUsuario from '../hooks/useObtenerUsuario'
import SeguidoresSeguidoLoader from '../components/animations/SeguidoresSeguidoLoader'

const SeguidoresPage = () => {
  // USE OBTENER USUARIO
  const { loading, persona } = useObtenerUsuario()

  if (loading) return <SeguidoresSeguidoLoader seguidores />

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante padding-10'>
        <Link to='/' className='flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        <div>
          <h1 className='titulo'>{persona.nombre}</h1>
          <Link to={`/user/${persona.usuario}`} className='usuario'>
            <b>{persona.usuario}</b>
          </Link>
        </div>
      </div>

      <div className='main'>
        <div className='indicadores--page'>
          <Link className='active' to={`/seguidores/${persona.usuario}`}>
            <b>{persona.seguidores.length} </b>
            Seguidores
          </Link>
          <Link to={`/siguiendo/${persona.usuario}`}>
            <b>{persona.seguidos.length} </b>Siguiendo
          </Link>
        </div>

        <Usuarios titulo='Seguidores' usuarios={persona.seguidores} />
      </div>
    </section>
  )
}

export default SeguidoresPage
