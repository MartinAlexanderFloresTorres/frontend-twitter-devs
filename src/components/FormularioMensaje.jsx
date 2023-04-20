import { useState } from 'react'
import { toast } from 'react-toastify'
import Avatar from './Avatar'
import useApp from '../hooks/useApp'
import Autorizacion from './Autorizacion'
import { POST_CREAR } from '../services/api/mensaje'
import { LoaderSvg, PaperAirplaneSvg, PhotoSvg, XMarkSvg } from '../assets/svgs'

export const DEFAULT_CAMPOS = {
  mensaje: '',
  foto: {}
}

const FormularioMensaje = ({ receptor }) => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)

  // USE APP
  const { user, socket } = useApp()

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

    setCampos({ ...campos, [name]: value.trimStart() })
  }

  const handleEliminarFoto = () => {
    setCampos({ ...campos, foto: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { foto, mensaje } = campos

    // VALIDACIONES
    if (!mensaje && !foto.secure_url) return toast.info('Agregue un comentario')
    if (mensaje.length > 500) return toast.info('La descripcion debe tener maximo 500 caracteres')

    setLoading(true)
    try {
      const { data } = await POST_CREAR({ receptor, mensaje, foto })
      setCampos(DEFAULT_CAMPOS)
      toast.success(data.message, { icon: '📝' })
      // EMITIR EVENTO AL ENVIAR EL MENSAJE
      socket.emit('/mensaje/conversacion/emitir', { mensaje: data.mensaje, conversacion: data.conversacion })

      // EXISTE UNA NOTIFICACION
      if (data.notificacion) {
        // EMITIR LA NOTIFICACION PARA EL USUARIO
        socket.emit('/usuario/notificaciones/emitir', data.notificacion)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }

    setLoading(false)
  }

  if (!user) return <Autorizacion />

  return (
    <form className='formulario--1' onSubmit={handleSubmit}>
      <Avatar user={user} />
      <input type='text' autoFocus value={campos.mensaje} name='mensaje' id='mensaje' onChange={handleChange} placeholder='Escribe un mensaje' />

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

      <div className='formularioTweet--botones formularioTweet--botones--mensaje'>
        {!loading && (
          <label htmlFor='fotoMensaje' className='flex'>
            <input type='file' accept='image/*' name='foto' id='fotoMensaje' onChange={handleChange} />
            <PhotoSvg />
          </label>
        )}
        <button type='submit' className={`btn--mensaje btn--${campos.mensaje.length < 1 && !campos.foto.secure_url ? '1' : '2'}`} disabled={(campos.mensaje.length < 1 && !campos.foto.secure_url) || loading}>
          {loading ? <LoaderSvg /> : <PaperAirplaneSvg />}
        </button>
      </div>
    </form>
  )
}

export default FormularioMensaje
