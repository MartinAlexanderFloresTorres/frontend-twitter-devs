import { Link } from 'react-router-dom'
import { ChevronLeftSvg } from '../assets/svgs'

const NotFoundPage = () => {
  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante padding-10'>
        <Link to={`/`} className='flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        <h2 className='titulo'>Ir al inicio</h2>
      </div>

      <div className='main'>
        <div className='padding flex h-full w-full'>
          <div>
            <h2 className='mb-10'>Pagina no encontrada</h2>

            <div className='flex'>
              <Link className='btn--2' to={'/'}>
                Ir al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
