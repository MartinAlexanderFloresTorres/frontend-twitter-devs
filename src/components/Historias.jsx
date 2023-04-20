import { useEffect, useRef, useState } from 'react'
import HistoriaPreview from './HistoriaPreview'
import useApp from '../hooks/useApp'
import SubirHistoria from './SubirHistoria'
import NuevaHistoria from './NuevaHistoria'
import ModalHistoria from './ModalHistoria'
import HistoriasLoader from './animations/HistoriasLoader'
import { ChevronLeftSvg, ChevronRightSvg, RefreshSvg } from '../assets/svgs'

const Historias = () => {
  // ESTADOS
  const [scroll, setScroll] = useState(0)
  const [modalNuevaHistoria, setModalNuevaHistoria] = useState(false)
  const [historiasUsuario, setHistoriaUsuario] = useState([])
  const [showPrevButton, setShowPrevButton] = useState(0)
  const [showNextButton, setShowNextButton] = useState(0)

  // USE APP
  const { user, modalHistoria, historias, handleRecargar, loadingHistorias } = useApp()

  // SCROLL REF
  const scrollRef = useRef(null)

  // EFFECTO
  useEffect(() => {
    const showPrevButton = scroll > 0
    const showNextButton = scroll < scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth
    setShowPrevButton(showPrevButton)
    setShowNextButton(showNextButton)
  }, [loadingHistorias])

  // HANDLE SCROLL
  const handleScroll = (scrollOffset) => {
    const element = document.querySelector('.historias__scroll')
    const newScrollLeft = element.scrollLeft + scrollOffset

    element.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
    setScroll(newScrollLeft)
  }

  // HANDLE MODAL NUEVA HISTORIA
  const handleModalNuevaHistoria = () => setModalNuevaHistoria(!modalNuevaHistoria)

  return (
    <>
      <div className='historias'>
        {loadingHistorias ? (
          <HistoriasLoader />
        ) : (
          <>
            {showPrevButton && (
              <button className='historias__navegacion flex historias__anterior' onClick={() => handleScroll(-200)}>
                <ChevronLeftSvg />
              </button>
            )}

            <div className='historias__scroll' ref={scrollRef}>
              <SubirHistoria handleModal={handleModalNuevaHistoria} />
              {historias.map((historiasUsuario) => (
                <HistoriaPreview key={historiasUsuario.historias[0]._id} historias={historiasUsuario} setHistorias={setHistoriaUsuario} />
              ))}
            </div>
            {showNextButton && (
              <button className='historias__navegacion flex historias__siguiente' onClick={() => handleScroll(200)}>
                <ChevronRightSvg />
              </button>
            )}

            <button className='flex historias__refresh' onClick={handleRecargar}>
              <RefreshSvg />
            </button>
          </>
        )}
      </div>

      {modalHistoria && user && <ModalHistoria historias={historiasUsuario} />}
      {modalNuevaHistoria && user && <NuevaHistoria handleModalNuevaHistoria={handleModalNuevaHistoria} />}
    </>
  )
}

export default Historias
