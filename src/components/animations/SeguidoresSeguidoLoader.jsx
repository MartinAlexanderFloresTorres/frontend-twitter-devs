import { Link } from 'react-router-dom'
import { ChevronLeftSvg } from '../../assets/svgs'
import SeguidorLoader from './SeguidorLoader'

const SeguidoresSeguidoLoader = ({ seguidores, siguiendo }) => {
  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante padding-10'>
        <Link to='/' className='flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        <div className='w-full'>
          <div className='l-item--loader mb-10' style={{ width: '60%', height: 17 }}></div>
          <div className='l-item--loader' style={{ width: '40%', height: 17 }}></div>
        </div>
      </div>

      <div className='main'>
        <div className='indicadores--page'>
          <div className={`indicadores--page--link ${seguidores ? 'active' : ''}`}>
            <b>0 </b>
            Seguidores
          </div>
          <div className={`indicadores--page--link ${siguiendo ? 'active' : ''}`}>
            <b>0 </b>
            Siguiendo
          </div>
        </div>

        <section>
          <div className='cabezera'>
            <h2 className='titulo'>{seguidores ? 'Seguidores' : 'Siguiendo'}</h2>
          </div>

          <ul className='seguidores'>
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
          </ul>
        </section>
      </div>
    </section>
  )
}

export default SeguidoresSeguidoLoader
