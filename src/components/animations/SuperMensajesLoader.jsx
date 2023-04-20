import { Link } from 'react-router-dom'
import MensajeLoader from './MensajeLoader'
import { ChevronLeftSvg, EllipsisVerticalSvg, PaperAirplaneSvg, PhotoSvg } from '../../assets/svgs'

const SuperMensajesLoader = () => {
  return (
    <section className='principal principal--mensajes hidden'>
      <div className='cabezera cabezera--flotante justify-between padding-10'>
        <div className='flex w-full'>
          <Link to='/mensajes' className='cabezera--flex btn--hover'>
            <ChevronLeftSvg />
          </Link>

          <div className='titulo flex w-full justify-start'>
            <div className='l__item--loaderAvatar'></div>
            <div className='l-item--loader' style={{ width: '50%', height: 24 }}></div>
          </div>
        </div>
        <div className='flex btn--hover cursor-allowed'>
          <EllipsisVerticalSvg />
        </div>
      </div>

      <div className='contenedor__mensajes hidden'>
        <MensajeLoader />
        <MensajeLoader emitente />
        <MensajeLoader />
        <MensajeLoader emitente />
        <MensajeLoader />
        <MensajeLoader emitente />
        <MensajeLoader />
      </div>

      <div className='formulario--flotante'>
        <div className='formulario--1'>
          <div className='l__item--loaderAvatar'></div>
          <div className='l-item--loader' style={{ width: '100%', height: 24 }}></div>

          <div className='formularioTweet--botones formularioTweet--botones--mensaje'>
            <div className='flex cursor-allowed'>
              <PhotoSvg />
            </div>

            <div className={`btn--mensaje btn--1 cursor-allowed`}>
              <PaperAirplaneSvg />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuperMensajesLoader
