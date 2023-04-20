import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import getCaretCoordinates from 'textarea-caret'
import Avatar from '../components/Avatar'
import useApp from '../hooks/useApp'
import Autorizacion from './Autorizacion'
import Loader from './Loader'
import { LoaderSvg, PhotoSvg, XMarkSvg } from '../assets/svgs'
import { POST_COMENTARIO } from '../services/api/comentario'
import { useParams } from 'react-router-dom'
import toArrayWords from '../helpers/toArrayWords'
import getMenciones from '../helpers/getMenciones'
import { getActiveToken } from '../helpers/getActiveToken'
import AutoCompletado from './AutoCompletado'

export const DEFAULT_CAMPOS = {
  texto: '',
  foto: {},
  menciones: []
}

const FormularioComentario = ({ setTweet, setComentarios }) => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)
  const [openAutoCompletado, setOpenAutoCompletado] = useState(false)
  const [palabra, setPalabra] = useState('')

  // USE REF TEXTAREA
  const inputRef = useRef()

  const { top, left } = inputRef.current ? getCaretCoordinates(inputRef.current, inputRef.current.selectionEnd) : { top: 0, height: 0 }

  const posicion = (left / inputRef.current?.offsetWidth) * left

  // USE APP
  const { user, loadingUser, socket } = useApp()

  // USE PARAMS
  const { id } = useParams()

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

    // NORMALIZAR  Y CONVERTIR EN UN ARRAY CADA PALABRA
    const palabras = toArrayWords(value)

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

    setCampos({ ...campos, [name]: value.trimStart(), menciones: mencionesNotRepite })
  }

  const handleEliminarFoto = () => {
    setCampos({ ...campos, foto: {} })
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
      setCampos({ ...campos, texto: newText, menciones: [...campos.menciones, { _id, usuario: user }] })
    } else {
      setCampos({ ...campos, texto: newText })
    }

    inputRef.current.focus()
    setOpenAutoCompletado(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { foto, texto, menciones } = campos

    // VALIDACIONES
    if (!texto) return toast.info('Agregue un comentario')
    if (texto.length > 500) return toast.info('La descripcion debe tener maximo 500 caracteres')

    setLoading(true)
    try {
      const mencionesIds = menciones.length > 0 ? menciones.map((m) => m._id) : []

      const { data } = await POST_COMENTARIO({ tweetId: id, texto, foto, menciones: mencionesIds })
      setCampos(DEFAULT_CAMPOS)
      toast.success(data.message, { icon: '📝' })
      // SINCRONIZAR
      setTweet((prev) => {
        prev.comentarios = [...prev.comentarios, data.comentario._id]
        return prev
      })
      setComentarios((prev) => {
        prev = [...prev, data.comentario]
        return prev
      })
      // EXISTE UNA NOTIFICACION
      if (data.notificacion) {
        // EMITIR LA NOTIFICACION PARA EL USUARIO
        socket.emit('/usuario/notificaciones/emitir', data.notificacion)
      }
      // NOTIFICACIONES
      if (data.notificaciones) {
        data.notificaciones.forEach((notificacion) => {
          // EMITIR LA NOTIFICACION PARA EL USUARIO
          socket.emit('/usuario/notificaciones/emitir', notificacion)
        })
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  if (loadingUser) return <Loader />

  if (!user) return <Autorizacion />

  return (
    <section className='formularioTweet formularioTweet--comentario'>
      <div className='flex'>
        <Avatar user={user} className='formularioTweet--avatar' />
        <div className='box-compose'>
          <form onSubmit={handleSubmit} className='flex'>
            <textarea autoFocus ref={inputRef} name='texto' id='texto' value={campos.texto} onChange={handleChange} cols='30' rows='10' placeholder='Escribir comentario...'></textarea>

            {openAutoCompletado && (
              <AutoCompletado right={posicion + 300 > inputRef.current?.offsetWidth ? '0px' : 'auto'} left={`${posicion + 300 > inputRef.current?.offsetWidth ? 'auto' : posicion + 'px'}`} top={`${top > 80 ? '110' : top + 26}px`} palabra={palabra} handleSeleccion={handleSeleccion} />
            )}
            <div className='formularioTweet--botones'>
              {!loading && (
                <label htmlFor='fotoComentario' className='flex'>
                  <input type='file' accept='image/*' name='foto' id='fotoComentario' onChange={handleChange} />
                  <PhotoSvg />
                </label>
              )}
              <button className={`btn flex btn--full ${loading ? 'btn--oscuro' : 'btn--primary'}`} disabled={loading}>
                {loading ? <LoaderSvg /> : 'Comentar'}
              </button>
            </div>
          </form>
        </div>
      </div>

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
    </section>
  )
}

export default FormularioComentario
