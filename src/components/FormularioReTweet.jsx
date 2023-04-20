import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import getCaretCoordinates from 'textarea-caret'
import useApp from '../hooks/useApp'
import Avatar from '../components/Avatar'
import AutoCompletado from './AutoCompletado'
import ReTweet from './ReTweet'
import HashtagsToJsx from './functions/HashtagsToJsx'
import MencionesToJsx from './functions/MencionesToJsx'
import hslToRgb from '../helpers/hslToRgb'
import { getActiveToken } from '../helpers/getActiveToken'
import { POST_RETWEET_CREAR } from '../services/api/tweet'
import { LoaderSvg, PhotoSvg, XMarkSvg } from '../assets/svgs'

export const DEFAULT_CAMPOS = {
  descripcion: '',
  hashtags: [],
  menciones: [],
  foto: {}
}

const MAX_CHARS = 380

const FormularioReTweet = ({ tweet, handleModalRetweet }) => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)
  const [porcentajeBarra, setPorcentajeBarra] = useState(0)
  const [contenido, setContenido] = useState([])
  const [openAutoCompletado, setOpenAutoCompletado] = useState(false)
  const [palabra, setPalabra] = useState('')

  // USE REF TEXTAREA
  const inputRef = useRef()

  const { top, left } = inputRef.current ? getCaretCoordinates(inputRef.current, inputRef.current.selectionEnd) : { top: 0, height: 0 }

  const posicion = (left / inputRef.current?.offsetWidth) * left

  // USE APP
  const { user, socket, agregarTweet } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'foto') {
      if (e.target.files.length === 1) {
        const file = e.target.files[0]
        if (file.type.startsWith('image/')) {
          const secure_url = URL.createObjectURL(file)
          setCampos({ ...campos, [name]: { secure_url, file } })
        }
      } else {
        setCampos({ ...campos, [name]: {} })
      }
      return
    }

    // Calcular el porcentaje actual de la barra de progreso
    if (value.length <= MAX_CHARS + 1) {
      const currentLength = value.length
      const porcentajeActual = (currentLength / MAX_CHARS) * 100
      setPorcentajeBarra(porcentajeActual)

      // Utiliza la función "replace()" para eliminar los saltos de línea y dividir el texto en un array utilizando el caracter "#" como separador
      const palabras = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\n/g, ' ')
        .split(' ')

      const hashtags = palabras.filter((palabra) => {
        // Verifica si la cadena comienza con un símbolo de almohadilla (#)
        if (palabra.match(/^#[a-zA-Z0-9_]+$/) && palabra.length > 1) {
          // si su longitud es igual a 2
          return palabra.split('#').length === 2
        }
        return false
      })

      /* 
       CODIGO
      */
      const { selectionEnd = 0 } = e.target
      const { word } = getActiveToken(value, selectionEnd)

      const correcto = /^@\w{1,20}$/.test(word)
      setOpenAutoCompletado(correcto)

      if (correcto) {
        setPalabra(word.slice(1))
      } else {
        setPalabra('')
      }

      setContenido([...HashtagsToJsx({ hashtags }), ...MencionesToJsx({ menciones: campos.menciones })])

      setCampos({ ...campos, [name]: value, hashtags })
    }
  }

  const handleEliminarFoto = () => {
    setCampos({ ...campos, foto: {} })
  }

  // CALCULAR COLOR BARRA DE PROGRESO
  const calcularColorBarra = () => {
    const hue = Math.round((1 - porcentajeBarra / 100) * 120) // mapea el valor de porcentajeBarra a un valor de tono HSL entre 120 (verde) y 0 (rojo)
    const saturation = 100 // constante de saturación
    const luminosity = 50 // constante de luminosidad
    const colorHSL = `hsl(${hue}, ${saturation}%, ${luminosity}%)` // crea el color HSL
    const colorRGB = hslToRgb(colorHSL) // convierte el color HSL a RGB
    return `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})` // devuelve el color RGB
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { foto, descripcion, hashtags, menciones } = campos

    // VALIDACIONES
    if (!descripcion) return toast.info('La descripcion es obligatoria')
    if (descripcion.length > MAX_CHARS) return toast.info(`La descripcion debe tener maximo ${MAX_CHARS} caracteres`)

    setLoading(true)
    try {
      const mencionesIds = menciones.length > 0 ? menciones.map((m) => m._id) : []
      const { data } = await POST_RETWEET_CREAR({ twetId: tweet._id, descripcion, foto, hashtags, menciones: mencionesIds })
      setCampos(DEFAULT_CAMPOS)
      toast.success(data.message, { icon: '🖋' })
      // SINCRONIZAR
      agregarTweet(data.tweet)
      // CERRAR EL MODAL
      handleModalRetweet()
      // EXISTE UNA NOTIFICACION
      if (data.notificacion) {
        // EMITIR LA NOTIFICACION PARA EL USUARIO
        socket.emit('/usuario/notificaciones/emitir', data.notificacion)
      }
      // REDIRECCIONAR
      navigate(`/tweet/${data.tweet._id}`)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  const handleSeleccion = ({ _id, user }) => {
    const { value, selectionEnd = 0 } = inputRef.current
    const { word, range } = getActiveToken(value, selectionEnd)
    const [index] = range

    const prefix = value.substring(0, index)
    const suffix = value.substring(index + word.length)

    const newText = prefix + `${user}` + suffix

    const existeMencion = campos.menciones.find((m) => m._id === _id)
    if (!existeMencion) {
      setCampos({ ...campos, descripcion: newText, menciones: [...campos.menciones, { _id, usuario: user }] })
      setContenido([...HashtagsToJsx({ hashtags: campos.hashtags }), ...MencionesToJsx({ menciones: [...campos.menciones, { _id, usuario: user }] })])
    } else {
      setCampos({ ...campos, descripcion: newText })
    }

    inputRef.current.focus()
    setOpenAutoCompletado(false)
  }

  // HANDLE ELIMINAR CONTENIDO
  const handleEliminarContenido = () => {
    setContenido([])
    setCampos({ ...campos, hashtags: [], menciones: [] })
  }

  return (
    <section className='formularioTweet'>
      <div className='formularioTweet--contenido'>
        <Avatar user={user} className='formularioTweet--avatar' />
        <div className='box-compose'>
          <form onSubmit={handleSubmit}>
            <textarea ref={inputRef} autoFocus name='descripcion' id='descripcion' value={campos.descripcion} onChange={handleChange} cols='30' rows='10' placeholder='¿Qué está pasando?'></textarea>

            {openAutoCompletado && (
              <AutoCompletado right={posicion + 300 > inputRef.current?.offsetWidth ? '0px' : 'auto'} left={`${posicion + 300 > inputRef.current?.offsetWidth ? 'auto' : posicion + 'px'}`} top={`${top > 80 ? '110' : top + 26}px`} palabra={palabra} handleSeleccion={handleSeleccion} />
            )}

            {contenido.length > 0 && (
              <div className='formularioTweet--hashtags mb-10'>
                {contenido}
                <button type='button' onClick={handleEliminarContenido} className='btn--circle btn--circle--error'>
                  <XMarkSvg />
                </button>
              </div>
            )}

            {campos.foto?.secure_url && (
              <div className='formularioTweet--imagen'>
                {!loading && (
                  <button className='btn btn--rojo' type='button' onClick={handleEliminarFoto}>
                    <XMarkSvg />
                  </button>
                )}
                <img src={campos.foto.secure_url} alt='foto' />
              </div>
            )}

            <ReTweet tweet={tweet} />

            <div className={`formularioTweet--botones ${loading ? 'formularioTweet--botones-right' : ''}`}>
              {!loading && (
                <label htmlFor='foto' className='flex'>
                  <input type='file' accept='image/*' name='foto' id='foto' onChange={handleChange} />
                  <PhotoSvg />
                </label>
              )}

              <div className='flex'>
                <div>
                  <div className='flex' role='progressbar' aria-valuemax='100' aria-valuemin='0'>
                    <div style={{ height: 30, width: 30 }}>
                      <svg height='100%' viewBox='0 0 30 30' width='100%' style={{ overflow: 'visible', rotate: '-90deg' }}>
                        <defs>
                          <clipPath id='0.5575620228829954'>
                            <rect height='100%' width='0' x='0'></rect>
                          </clipPath>
                        </defs>
                        <circle cx='50%' cy='50%' fill='none' r='15' stroke='#2F3336' strokeWidth='2'></circle>
                        <circle cx='50%' cy='50%' fill='none' r='15' stroke={calcularColorBarra()} strokeDasharray={100} strokeDashoffset={100 - porcentajeBarra} strokeLinecap='round' strokeWidth='2'></circle>
                        <circle cx='50%' cy='50%' clipPath='url(#0.5575620228829954)' fill='#1D9BF0' r='0'></circle>
                      </svg>
                    </div>
                  </div>
                  <div dir='auto'>
                    {campos.descripcion.length}/{MAX_CHARS}
                  </div>
                </div>

                <button className={`btn flex btn--height ${loading ? 'btn--oscuro' : 'btn--primary'}`} disabled={loading || campos.descripcion.length > MAX_CHARS}>
                  {loading ? <LoaderSvg /> : 'Publicar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default FormularioReTweet
