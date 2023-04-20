import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import getCaretCoordinates from 'textarea-caret'
import Avatar from '../components/Avatar'
import useApp from '../hooks/useApp'
import { POST_CREAR } from '../services/api/tweet'
import { getActiveToken } from '../helpers/getActiveToken'
import AutoCompletado from './AutoCompletado'
import { LoaderSvg, PhotoSvg, XMarkSvg } from '../assets/svgs'
import HashtagsToJsx from './functions/HashtagsToJsx'
import MencionesToJsx from './functions/MencionesToJsx'
import getHashtags from '../helpers/getHashtags'
import getMenciones from '../helpers/getMenciones'
import calcularColorBarra from '../helpers/calcularColorBarra'
import toArrayWords from '../helpers/toArrayWords'

export const DEFAULT_CAMPOS = {
  descripcion: '',
  hashtags: [],
  menciones: [],
  foto: {}
}

const MAX_CHARS = 380

const FormularioTweet = () => {
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
  const { user, agregarTweet, socket } = useApp()

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

      // NORMALIZAR  Y CONVERTIR EN UN ARRAY CADA PALABRA
      const palabras = toArrayWords(value)

      // HASHTAGAS
      const hashtags = getHashtags(palabras)

      // MENCIONES
      const menciones = getMenciones(palabras)

      // POSICION EN EL QUE TERMINA LA SELECCION
      const { selectionEnd = 0 } = e.target

      // OBTENERMOS EL WORD
      const { word } = getActiveToken(value, selectionEnd)

      // IS ARROBA
      const isArroba = /^@\w{1,20}$/.test(word)

      // ES CORRECTO EL @
      if (isArroba) {
        setPalabra(word.slice(1))
      } else {
        setPalabra('')
      }

      // MOSTRAMOS EL AUTOCOMPLETADO
      setOpenAutoCompletado(isArroba)

      // FILTRAR TODAS LAS MENCIONES MAPEADAS POR OBJETO {_id, usuario}
      const mencionesMapeadas = menciones.map((t, i) => {
        // SI EL TEXTO ES IGUAL AL TEXTO SIGUIENTE
        if (t === menciones[i + 1]) return null

        // SI EXISTE LA MENCION EN EL ARRAY DE MENCIONES
        const existe = campos.menciones.find((m) => m.usuario === t)
        // RETORNAMOS LA MENCION
        if (existe) return existe
        // RETORNAMO NULL
        return null
      })

      // FILTRAR LAS MENCIONES NULLAS
      const mencionesNotNull = mencionesMapeadas.filter((m, i) => m !== null)

      // FILTAR POR NO REPETIDAS
      const mencionesNotRepite = mencionesNotNull.filter((m, i) => {
        return mencionesNotNull.indexOf(m) === i
      })

      // GUARDAR EL CONTENIDO
      setContenido([...HashtagsToJsx({ hashtags }), ...MencionesToJsx({ menciones: mencionesNotRepite })])

      // GUARDAR LOS CAMPOS
      setCampos({ ...campos, [name]: value, hashtags, menciones: mencionesNotRepite })
    }
  }

  // ELIMINAR FOTO
  const handleEliminarFoto = () => {
    setCampos({ ...campos, foto: {} })
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

      const { data } = await POST_CREAR({ descripcion, foto, hashtags, menciones: mencionesIds })
      setCampos(DEFAULT_CAMPOS)
      toast.success(data.message, { icon: '🖋' })
      // SINCRONIZAR
      agregarTweet(data.tweet)
      // NOTIFICACIONES
      if (data.notificaciones) {
        data.notificaciones.forEach((notificacion) => {
          // EMITIR LA NOTIFICACION PARA EL USUARIO
          socket.emit('/usuario/notificaciones/emitir', notificacion)
        })
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

    // ELIMINAR TODO LAS MENCIONES Y HASHTAGS DEL TEXTO
    const newText = campos.descripcion
      .split(' ')
      .filter((t) => !campos.hashtags.includes(t))
      .filter((t) => campos.menciones.findIndex((m) => m.usuario === t) === -1)
      .join(' ')

    // GUARDAR LO ACTUALIZADO
    setCampos({ ...campos, descripcion: newText, hashtags: [], menciones: [] })

    // ACTIVAR FOCUC
    inputRef.current.focus()
    // CERRAR EL AUTOCOMPLETADO
    setOpenAutoCompletado(false)
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
            <div className={`formularioTweet--botones ${loading ? 'formularioTweet--botones-right' : ''}`}>
              {!loading && (
                <label htmlFor='fotoTweet' className='flex'>
                  <input type='file' accept='image/*' name='foto' id='fotoTweet' onChange={handleChange} />
                  <PhotoSvg />
                </label>
              )}

              <div className='flex'>
                <div className='tweet-progreso'>
                  <div className='flex' role='progressbar' aria-valuemax='100' aria-valuemin='0'>
                    <div style={{ height: 30, width: 30 }}>
                      <svg height='100%' viewBox='0 0 30 30' width='100%' style={{ overflow: 'visible', rotate: '-90deg' }}>
                        <defs>
                          <clipPath id='0.5575620228829954'>
                            <rect height='100%' width='0' x='0'></rect>
                          </clipPath>
                        </defs>
                        <circle cx='50%' cy='50%' fill='none' r='15' stroke='#2F3336' strokeWidth='2'></circle>
                        <circle cx='50%' cy='50%' fill='none' r='15' stroke={calcularColorBarra(porcentajeBarra)} strokeDasharray={100} strokeDashoffset={100 - porcentajeBarra} strokeLinecap='round' strokeWidth='2'></circle>
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

export default FormularioTweet
