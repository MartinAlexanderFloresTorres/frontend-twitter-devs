import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import useApp from '../hooks/useApp'
import Modal from './Modal'
import Avatar from './Avatar'
import { POST_CREAR } from '../services/api/historia'
import { PauseSvg, PlaySvg, PlusSvg, SpeakerWaveSvg, SpeakerXMarkSvg } from '../assets/svgs'
import LoaderColorize from './animations/LoaderColorize'

const DEFAULT_CAMPOS = {
  archivo: {
    tipo: '',
    data: {
      secure_url: ''
    }
  },
  texto: ''
}

const NuevaHistoria = ({ handleModalNuevaHistoria }) => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState({ playing: false, muted: true })

  // VIDEO REF
  const videoRef = useRef()

  // USE APP
  const { user, handleRecargar } = useApp()

  // FUNCIONES
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'archivo') {
      if (e.target.files.length === 1) {
        const file = e.target.files[0]
        const tipoArchivo = file.type
        const secure_url = URL.createObjectURL(file)
        if (tipoArchivo.startsWith('image/')) {
          setCampos({ ...campos, archivo: { data: { secure_url, file }, tipo: 'imagen' } })
        } else if (tipoArchivo.startsWith('video/')) {
          // SI EXCEDE LOS 60 SEGUNDOS MOSTRAR UN MENSAJE QUE SE RECORTARA
          const videoElement = document.createElement('video')
          videoElement.src = secure_url
          videoElement.addEventListener('loadedmetadata', () => {
            const durationInSeconds = Math.floor(videoElement.duration)
            if (durationInSeconds > 60) {
              toast.info('El video excedió los 60 segundos, Sera cortado cuando lo publique')
            }
          })

          setCampos({ ...campos, archivo: { data: { secure_url, file }, tipo: 'video' } })
        }
      } else {
        setCampos({
          ...campos,
          [name]: {
            tipo: '',
            data: {
              secure_url: ''
            }
          }
        })
      }
      return
    }

    setCampos({ ...campos, [name]: value.trimStart() })
  }

  // HANDLE ELIMINAR ARCHIVO
  const handleEliminarArchivo = () => {
    setCampos({
      ...campos,
      archivo: {
        tipo: '',
        data: {
          secure_url: ''
        }
      }
    })
    setVideo({ playing: false, muted: true })
  }

  // HANDLE PLAY OR PAUSE
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
    setVideo({ ...video, playing: !video.playing })
  }

  // HANDLE MUTE OR UNMUTE
  const handleMuteUnmute = () => {
    setVideo({ ...video, muted: !video.muted })
  }

  // HANDLE CREAR HISTORIA
  const handleCrear = async () => {
    const { archivo, texto } = campos

    // VALIDACIONES
    if (!texto && !archivo.data?.file) return toast.info('Suba una (imagen u video) o escriba algun texto')
    if (texto.length > 300) return toast.info('El texto debe tener maximo 300 caracteres')

    setLoading(true)
    try {
      // CERRAR EL MODAL
      handleModalNuevaHistoria()

      await toast.promise(POST_CREAR({ archivo, texto }), {
        pending: 'Su historia se esta subiendo...',
        success: 'Historia Subida 👌',
        error: 'Error al subir 🤯'
      })

      // SI SUBIO RECARGAR
      handleRecargar()
      setCampos(DEFAULT_CAMPOS)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return (
    <Modal fondo={'var(--primary-color)'} fondoContainer={'var(--primary-color)'} height={'calc(100% - 59px)'} maxWidth={'50vh'} handleClose={handleModalNuevaHistoria} titulo={'Twitter'} cabezeraFlotante cuerpoClass={'historia__completa'}>
      {campos.archivo.data.secure_url && (
        <div className='historias__contenido'>
          <div className='historias__contenido__center'>{campos.archivo.tipo === 'imagen' ? <img src={campos.archivo.data.secure_url} alt='imagen' /> : campos.archivo.tipo === 'video' && <video src={campos.archivo.data.secure_url} ref={videoRef} muted={video.muted} />}</div>
        </div>
      )}

      <div className='historia__top'>
        <div className='flex justify-between'>
          <div className='flex'>
            <Avatar user={user} />
            <p>{user.nombre}</p>
          </div>

          {campos.archivo.tipo === 'video' && (
            <div className='flex'>
              <button onClick={handlePlayPause}>{video.playing ? <PauseSvg /> : <PlaySvg />}</button>
              <button onClick={handleMuteUnmute}>{video.muted ? <SpeakerXMarkSvg /> : <SpeakerWaveSvg />}</button>
            </div>
          )}
        </div>
      </div>

      <div className={`historia__agregar ${campos.archivo.data.secure_url ? 'active' : ''}`}>
        {!campos.archivo.data.secure_url && (
          <div className='historia__agregar__file'>
            <label htmlFor='archivo' className='historia'>
              <div className='historia__preview'>
                <div className='historia__preview__imagen'>
                  <PlusSvg />
                </div>
                <h3>Subir imagen o video</h3>
              </div>

              <input type='file' accept='image/*,video/*' name='archivo' onChange={handleChange} id='archivo' />
            </label>
          </div>
        )}

        <label htmlFor='texto'>
          <textarea className='historia__agregar__inputTexto' autoFocus type='text' name='texto' id='texto' value={campos.texto} onChange={handleChange} placeholder='Escribe algo?' />
        </label>
      </div>
      <div className='historia__bottom botones padding'>
        {campos.archivo.data.secure_url && (
          <button className='btn btn--rojo w-full' onClick={handleEliminarArchivo} disabled={loading}>
            Quitar {campos.archivo.tipo}
          </button>
        )}
        <button className='btn btn--height flex btn--primary w-full' onClick={handleCrear} disabled={loading}>
          {loading ? <LoaderColorize /> : 'Publicar'}
        </button>
      </div>
    </Modal>
  )
}

export default NuevaHistoria
