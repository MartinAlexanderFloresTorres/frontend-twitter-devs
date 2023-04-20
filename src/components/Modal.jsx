import { useEffect } from 'react'
import { XMarkSvg } from '../assets/svgs'

const Modal = ({ fondo, centerClass, center, fondoContainer, maxWidth, height, titulo, handleClose, cabezera, cabezeraFlotante, cuerpoClass, children }) => {
  // EFECTO ESCAPE CERRAR MODAL
  useEffect(() => {
    function closeModalOnEscape(event) {
      if (event.key === 'Escape') {
        // Cerrar el modal
        handleClose()
      }
    }

    window.addEventListener('keydown', closeModalOnEscape)
    document.querySelector('body').style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', closeModalOnEscape)
      document.querySelector('body').style.overflow = 'auto'
    }
  }, [])

  return (
    <section
      className={`modal ${center ? 'grid-center' : ''}`}
      style={{ background: fondo, padding: cabezeraFlotante ? 0 : 20 }}
      onClick={(e) => {
        if (e.target.classList.contains('modal')) {
          handleClose()
        }
      }}
    >
      {cabezeraFlotante && (
        <div className='modal__top'>
          <h2>{titulo}</h2>
          <button onClick={handleClose} className='btn--hover'>
            <XMarkSvg />
          </button>
        </div>
      )}
      <div className={centerClass} style={{ padding: cabezeraFlotante ? 20 : 0, height }}>
        <div className='modal__container' style={{ background: fondoContainer, maxWidth, height: '100%' }}>
          {cabezera && !cabezeraFlotante && (
            <div className='modal__top'>
              <h2>{titulo}</h2>
              <button onClick={handleClose} className='btn--hover'>
                <XMarkSvg />
              </button>
            </div>
          )}

          <div className={`modal__cuerpo ${cuerpoClass}`}>{children}</div>
        </div>
      </div>
    </section>
  )
}

Modal.defaultProps = {
  fondo: 'rgba(16, 16, 16, 0.707)',
  fondoContainer: '',
  maxWidth: 500,
  height: 'fit-content',
  titulo: 'Modal',
  cabezera: true,
  cuerpoClass: '',
  centerClass: '',
  cabezeraFlotante: false,
  center: false,
  handleClose: () => {}
}

export default Modal
