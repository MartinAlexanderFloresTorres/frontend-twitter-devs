import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useApp from '../hooks/useApp'
import useHeartHistoria from '../hooks/useHeartHistoria'
import useVistoHistoria from '../hooks/useVistoHistoria'
import useObtenerHistoria from '../hooks/useObtenerHistoria'
import FormularioMensaje from './FormularioMensaje'
import HistoriaVistaPor from './HistoriaVistaPor'
import formatearTiempo from '../helpers/formatearTiempo'
import Avatar from './Avatar'
import { ChevronLeftSvg, ChevronRightSvg, EllipsisVerticalSvg, HeartIsSvg, HeartSvg, LoaderSvg, PauseSvg, PlaySvg, SpeakerWaveSvg, SpeakerXMarkSvg } from '../assets/svgs'

const Historia = ({ creador, setPauseHistoria, pauseHistoria, historiasIds, historiaId, setOpcionesActive, opcionesActive, setProgreso, progreso, setHistoriaActual, historiaActual, handlePrevHistoria, handleNextHistoria }) => {
  // ESTADOS
  const [video, setVideo] = useState({ playing: true, muted: true })
  const [loaded, setLoaded] = useState(true)
  const [disabledButton, setDisableButton] = useState(true)

  // VIDEO REF
  const videoRef = useRef()

  // USE APP
  const { user, handleCerrarModalHistoria } = useApp()

  // USE MODAL VISTO POR
  const { handleVistoById, loading: loadingVisto } = useVistoHistoria()

  // USE HEART HISTORIA
  const { handleHeartById, loading: loadingHeart } = useHeartHistoria()

  // USE OBTENER HISTORIA
  const { historia, editarHistoria, loading: loadingHistoria } = useObtenerHistoria({ historiaId })

  // EFECTO CAMBIAR AL SIGUIENTE HISTORIA
  useEffect(() => {
    // DEFAULT ESTADOS
    setPauseHistoria(false)

    if (historia && !loadingHistoria) {
      // Historia vista
      const visto = historia.vistosPor.some((p) => p._id === user._id)

      // Si no esta visto
      if (!visto) {
        // MARCAR COMO VISTO LA HISTORIA
        handleVistoById({ historiaId: historia._id })
      }

      // SI NO HAY VIDEO O IMAGEN HABILITAR LOS BOTONES
      if (historia.archivo.tipo === '') {
        setDisableButton(false)
        setLoaded(false)
      }

      // Cada vez que cambia la historia colocar en false
      setOpcionesActive(false)
    }
  }, [historiaActual, loadingHistoria])

  // EFECTO PARA CAMBIAR EL PROGRESO DE LA IMAGEN DE 10 SEGUNDOS
  useEffect(() => {
    if (historia && !loadingHistoria) {
      /* console.log(historia?.archivo?.tipo === 'imagen' || historia.texto.length > 0) */
      if (historia?.archivo?.tipo !== 'video') {
        // IMPLEMENTAR AQUI LA DURACION DE LA IMAGEN
        // Establecer la duración de la imagen en 10 segundos
        const duracionImagen = 10000 // en milisegundos

        // Incrementar el progreso cada 10 milisegundos
        const incrementarProgreso = () => {
          if (!pauseHistoria) {
            setProgreso((progreso) => {
              // ACABO
              if (progreso === 99) {
                handleNextHistoria()
              }

              return progreso + 1
            })
          }
        }

        // Ejecutar la función 'incrementarProgreso' cada 10 milisegundos
        const timer = setInterval(incrementarProgreso, duracionImagen / 100)

        // Detener el temporizador cuando se desmonta el componente o se avanza a la siguiente historia
        return () => clearInterval(timer)
      }
    }
  }, [historiaActual, loaded, historia, pauseHistoria])

  // EFECTO PARA CERRAR EL MODAL SI ES LA ULTIMA HISTORIA DE UNA IMAGEN
  useEffect(() => {
    if (historia && !loadingHistoria) {
      if (historia?.archivo?.tipo !== 'video') {
        // SI ESTAMOS EN LA ULTIMA HISTORIA
        if (historiaActual === historiasIds.length - 1) {
          // SI LA IMAGEN ACABO ENTONCES CERRAR EL MODAL
          if (progreso === 99) {
            handleCerrarModalHistoria()
          }
        }
      }
    }
  }, [progreso])

  // EFFECTO DE PAUSAR VIDEO
  useEffect(() => {
    if (historia?.archivo?.tipo == 'video') {
      if (videoRef.current) {
        if (pauseHistoria) {
          if (!videoRef.current.paused) {
            !loaded && videoRef.current.pause()
            setVideo({ ...video, playing: false })
          }
        } else {
          if (videoRef.current.paused) {
            !loaded && videoRef.current.play()
            setVideo({ ...video, playing: true })
          }
        }
      }
    }
  }, [pauseHistoria])

  // HANDLE TIME UPDATE VIDEO
  const handleTimeUpdate = (e) => {
    // CALCULAR EL TIEMPO
    const { duration, currentTime } = e.target
    const currentProgress = (currentTime / duration) * 100
    setProgreso(currentProgress)
    // SI EL VIDEO ACABO ENTONCES CERRAR EL MODAL
    if (videoRef.current.duration === videoRef.current.currentTime) {
      // SI ESTAMOS EN LA ULTIMA HISTORIA
      if (historiaActual === historiasIds.length - 1) {
        handleCerrarModalHistoria()
      } else {
        handleNextHistoria()
      }
    }
  }

  // HANDLE PLAY OR PAUSE
  const handlePlayPause = () => {
    if (historia?.archivo?.tipo == 'video') {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          !loaded && videoRef.current.play()
        } else {
          !loaded && videoRef.current.pause()
        }
      }
    }
    setVideo({ ...video, playing: !video.playing })
    setPauseHistoria(!pauseHistoria)
  }

  // HANDLE  PAUSE
  const handlePause = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        !loaded && videoRef.current.pause()
      }
    }
    setVideo({ playing: false, muted: video.muted })
    setPauseHistoria(true)
  }

  // HANDLE PLAY
  const handlePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        !loaded && videoRef.current.play()
      }
    }
    setVideo({ playing: true, muted: video.muted })
    setPauseHistoria(false)
  }

  // HANDLE MUTE OR UNMUTE
  const handleMuteUnmute = () => {
    setVideo({ ...video, muted: !video.muted })
  }

  // HANDLE HISTORIA INDICE
  const handleHistoriaIndice = (i) => {
    // Reiniciar el progreso
    setProgreso(0)
    setHistoriaActual(i)
  }

  // HANDLE OPCIONES
  const handleOpciones = () => setOpcionesActive(!opcionesActive)

  // HANDLE LOADED DATA
  const handleLoadedData = () => {
    setLoaded(false)
    setDisableButton(false)
    setPauseHistoria(false)
  }

  if (loadingHistoria) {
    return (
      <>
        {historiaActual > 0 && (
          <button className='historias__navegacion flex historias__anterior' onClick={handlePrevHistoria}>
            <ChevronLeftSvg />
          </button>
        )}

        <div className='historia__top'>
          <div className='historia__cantidades'>
            {historiasIds.map((h, indice) => (
              <button key={h} onClick={() => handleHistoriaIndice(indice)} className={`historia__cantidades__item ${historiaActual === indice ? 'activo' : ''}`}>
                <div className='historia__cantidades__itemPogreso' style={{ width: `${progreso}%` }} />
              </button>
            ))}
          </div>

          <div className='flex justify-between'>
            <div className='flex historia__top--left'>
              <Avatar user={creador} />
              <p className='historia__nombreUsuario' title={creador.nombre}>
                {creador.nombre}
              </p>
            </div>
          </div>
        </div>

        <div className={`historia__loader historia__loader__absolute flex h-full`}>
          <LoaderSvg />
        </div>

        {historiaActual < historiasIds.length - 1 && (
          <button className='historias__navegacion flex historias__siguiente' onClick={handleNextHistoria}>
            <ChevronRightSvg />
          </button>
        )}
      </>
    )
  }

  if (!historia) {
    return (
      <>
        {historiaActual > 0 && (
          <button className='historias__navegacion flex historias__anterior' onClick={handlePrevHistoria}>
            <ChevronLeftSvg />
          </button>
        )}

        <div className='historia__top'>
          <div className='historia__cantidades'>
            {historiasIds.map((h, indice) => (
              <button key={h} onClick={() => handleHistoriaIndice(indice)} className={`historia__cantidades__item ${historiaActual === indice ? 'activo' : ''}`}>
                <div className='historia__cantidades__itemPogreso' style={{ width: `${progreso}%` }} />
              </button>
            ))}
          </div>

          <div className='flex justify-between'>
            <div className='flex historia__top--left'>
              <Avatar user={creador} />
              <p className='historia__nombreUsuario' title={creador.nombre}>
                {creador.nombre}
              </p>
            </div>
          </div>
        </div>

        <div className={`historia__loader historia__loader__absolute flex h-full`}>
          <h2 className='alerta--error'>La historia fue eliminada</h2>
        </div>

        {historiaActual < historiasIds.length - 1 && (
          <button className='historias__navegacion flex historias__siguiente' onClick={handleNextHistoria}>
            <ChevronRightSvg />
          </button>
        )}
      </>
    )
  }

  return (
    <>
      {historiaActual > 0 && (
        <button className='historias__navegacion flex historias__anterior' onClick={handlePrevHistoria}>
          <ChevronLeftSvg />
        </button>
      )}

      {historia?.archivo?.data?.secure_url && (
        <div className='historias__contenido'>
          <div className='historias__contenido__center'>
            {historia?.archivo?.tipo === 'imagen' ? (
              <img src={historia?.archivo?.data.secure_url} alt='imagen' onLoad={handleLoadedData} />
            ) : (
              historia?.archivo?.tipo === 'video' && <video src={historia?.archivo?.data.secure_url} onTimeUpdate={handleTimeUpdate} onLoadedData={handleLoadedData} ref={videoRef} autoPlay muted={video.muted} />
            )}
          </div>
        </div>
      )}

      <div className='historia__top'>
        <div className='historia__cantidades'>
          {historiasIds.map((h, indice) => (
            <button key={h} onClick={() => handleHistoriaIndice(indice)} className={`historia__cantidades__item ${historiaActual === indice ? 'activo' : ''}`}>
              <div className='historia__cantidades__itemPogreso' style={{ width: `${progreso}%` }} />
            </button>
          ))}
        </div>

        <div className='flex justify-between'>
          <div className='flex historia__top--left'>
            <Avatar user={historia.creador} />
            <p className='historia__nombreUsuario' title={creador.nombre}>
              {historia.creador.nombre}
            </p>
            <b>{formatearTiempo(historia.createdAt)}</b>
          </div>

          <div className='flex relative'>
            <button onClick={handlePlayPause} disabled={loaded || disabledButton}>
              {!pauseHistoria ? <PauseSvg /> : <PlaySvg />}
            </button>

            {historia?.archivo?.tipo === 'video' && (
              <>
                <button onClick={handleMuteUnmute} disabled={loaded || disabledButton}>
                  {video.muted ? <SpeakerXMarkSvg /> : <SpeakerWaveSvg />}
                </button>
              </>
            )}
            {user._id === historia.creador._id && (
              <button onClick={handleOpciones} disabled={loaded || disabledButton}>
                <EllipsisVerticalSvg />
              </button>
            )}
          </div>
        </div>
      </div>

      {historia.texto && (
        <div className={`historia__texto ${user._id !== historia.creador._id ? 'historia__texto--margin' : ''} ${!historia?.archivo?.data?.secure_url ? 'historia__texto--main' : ''}`}>
          <h2>{historia.texto}</h2>
        </div>
      )}

      {loaded && historia?.archivo?.data?.secure_url && (
        <div className={`historia__loader historia__loader__absolute flex h-full`}>
          <LoaderSvg />
        </div>
      )}

      {user._id === historia.creador._id && <HistoriaVistaPor setDisableButton={setDisableButton} handlePause={handlePause} handlePlay={handlePlay} hearts={historia.hearts} vistosPor={historia.vistosPor} />}

      {user._id !== historia.creador._id && (
        <div className='historia__bottom historia__bottom__historia'>
          <div className='flex'>
            <FormularioMensaje receptor={historia.creador._id} />
            <button className='flex btn--loader' onClick={() => handleHeartById({ historiaId: historia._id, editarHistoria })} disabled={loadingHeart}>
              {loadingHeart ? <LoaderSvg /> : historia.hearts.includes(user._id) ? <HeartIsSvg /> : <HeartSvg />}
            </button>
          </div>
        </div>
      )}

      {historiaActual < historiasIds.length - 1 && (
        <button className='historias__navegacion flex historias__siguiente' onClick={handleNextHistoria}>
          <ChevronRightSvg />
        </button>
      )}
    </>
  )
}

export default Historia
