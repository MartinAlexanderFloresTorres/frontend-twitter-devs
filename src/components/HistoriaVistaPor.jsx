import { useState } from 'react'
import Seguidor from './Seguidor'
import { EyeSvg, XMarkSvg } from '../assets/svgs'

const HistoriaVistaPor = ({ hearts, vistosPor, handlePause, handlePlay, setDisableButton }) => {
  // ESTADOS
  const [isVisible, setIsVisible] = useState(false)

  // HANDLE VISIBLE
  const handleVisible = () => {
    setIsVisible(!isVisible)
    if (!isVisible) {
      setDisableButton(true)
      handlePause()
    } else {
      setDisableButton(false)
      handlePlay()
    }
  }

  return (
    <div className={`historia__vistoPor ${isVisible ? 'historia__vistoPorFull' : ''}`}>
      {!isVisible && (
        <button className='historia__vistoPor__top flex' onClick={handleVisible}>
          <EyeSvg />
          <p>Vista por {vistosPor.length} personas</p>
        </button>
      )}

      {isVisible && (
        <div className='historia__vistoPor__contenido'>
          <div className='historia__vistoPor__top flex'>
            <div className='flex'>
              <EyeSvg />
              <p>Vista por {vistosPor.length} personas</p>
            </div>
            <button className='flex historia__vistoPor__btnClose' onClick={handleVisible}>
              <XMarkSvg />
            </button>
          </div>

          <div>
            {vistosPor.map((persona) => (
              <ul className='relative' key={persona._id}>
                <Seguidor seguidor={persona} />
                {hearts.includes(persona._id) && (
                  <div className='historia__vistoPor__heart'>
                    <img src='/heart.png' alt='heart' />
                  </div>
                )}
              </ul>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HistoriaVistaPor
