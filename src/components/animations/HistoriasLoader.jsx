import { PlusSvg } from '../../assets/svgs'
import LoaderHistoria from './LoaderHistoria'

const HistoriasLoader = () => {
  return (
    <div className='historias__scroll'>
      <div className='historia historia__nueva'>
        <div className='historia__preview'>
          <div className='historia__preview__imagen'>
            <PlusSvg />
          </div>
          <h2>Nueva Historia</h2>
        </div>
      </div>
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
      <LoaderHistoria />
    </div>
  )
}

export default HistoriasLoader
