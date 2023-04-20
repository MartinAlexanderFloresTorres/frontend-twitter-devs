import { PlusSvg } from '../assets/svgs'

const SubirHistoria = ({ handleModal }) => {
  return (
    <button className='historia historia__nueva' onClick={handleModal}>
      <div className='historia__preview'>
        <div className='historia__preview__imagen'>
          <PlusSvg />
        </div>
        <h2>Nueva Historia</h2>
      </div>
    </button>
  )
}

export default SubirHistoria
