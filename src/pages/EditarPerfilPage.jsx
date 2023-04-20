import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useApp from '../hooks/useApp'
import generarUsuario from '../helpers/generarUsuario'
import { POST_ACTUALIZAR_USUARIO } from '../services/api/usuario'
import { ChevronLeftSvg } from '../assets/svgs'

export const DEFAULT_CAMPOS = {
  nombre: '',
  usuario: '',
  nacimiento: '',
  descripcion: '',
  email: '',
  avatar: {},
  banner: {}
}

const EditarPerfilPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)

  // USE APP
  const { user, login } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE PARAMS
  const { usuario } = useParams()

  // USE EFFECT
  useEffect(() => {
    // ES EL USUARIO CORRECTO
    if (user.usuario === usuario) {
      setCampos({
        nombre: user.nombre,
        usuario: user.usuario,
        nacimiento: user.nacimiento.split('T')[0],
        descripcion: user.descripcion,
        email: user.email,
        avatar: user.avatar,
        banner: user.banner
      })
    } else {
      // USUARIOS NO SON IGUALES
      toast.error('No tienes permisos')
      navigate(`/user/${user.usuario}`)
    }
  }, [user])

  // FUNCIONES
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'avatar' || name === 'banner') {
      if (e.target.files.length === 1) {
        const file = e.target.files[0]
        const secure_url = URL.createObjectURL(file)
        setCampos({ ...campos, [name]: { public_id: '', secure_url, file } })
      } else {
        setCampos({ ...campos, [name]: user[name] })
      }
      return
    }

    if (name === 'nombre') {
      if (value.length > 36) {
        return toast.info('Nombre del usuario maximo 36 caracteres')
      }
      // solo letras y numeros
      if (!/^[a-zA-Z0-9_ ]*$/g.test(value)) return toast.info('Solo letras y numeros')
      setCampos({ ...campos, nombre: value, usuario: generarUsuario(value) })
      return
    } else if (name === 'usuario') {
      setCampos({ ...campos, usuario: generarUsuario(value) })
      return
    }

    setCampos({ ...campos, [name]: value.trimStart() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nombre, usuario, nacimiento, descripcion, email, avatar, banner } = campos

    // VALIDACIONES
    if (!nombre) return toast.info('El nombre es obligatorio')
    if (!email) return toast.info('El email es obligatorio')
    if (!nacimiento) return toast.info('La fecha de nacimiento es obligatoria')
    // Debe tener mayor de 16 años
    if (new Date(nacimiento).getFullYear() > new Date().getFullYear() - 16) return toast.info('Debes tener mayor de 16 años')
    if (!descripcion) return toast.info('La descripcion es obligatoria')
    if (descripcion.length < 20) return toast.info('La descripcion debe tener minimo 20 caracteres')
    if (descripcion.length > 500) return toast.info('La descripcion debe tener maximo 500 caracteres')

    setLoading(true)
    try {
      const { data } = await POST_ACTUALIZAR_USUARIO({ id: user._id, nombre, usuario, nacimiento, descripcion, email, avatar, banner })

      login(data.usuario)
      toast.success(data.message, { icon: '⚙' })

      // REDIRECCIONAR
      navigate(`/user/${data.usuario.usuario}`)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante padding-10'>
        <Link to={`/user/${user.usuario}`} className='flex btn--hover'>
          <ChevronLeftSvg />
        </Link>
        <h2 className='titulo'>Editar Perfil</h2>
      </div>

      {user.usuario === usuario && (
        <div className='contenedor main'>
          <div className='editar'>
            <div className='editar__banner'>
              {campos.banner.secure_url && <img src={campos.banner.secure_url} alt={`${campos.nombre}-banner`} />}
              <label htmlFor='banner'>
                <span className='btn--2'>Editar Banner</span>
                <input type='file' accept='image/*' id='banner' name='banner' onChange={handleChange} />
              </label>
            </div>

            <div className='editar__top'>
              <div className='editar__top--avatar'>{campos.avatar.secure_url && <img src={campos.avatar.secure_url} alt={`${campos.nombre}-avatar`} />}</div>

              <label htmlFor='avatar'>
                <span className='btn--2'>Editar Foto</span>
                <input type='file' accept='image/*' id='avatar' name='avatar' onChange={handleChange} />
              </label>
            </div>
          </div>

          <form className='formulario' onSubmit={handleSubmit}>
            <div className='formulario__grupo'>
              <label htmlFor='nombre' className='formulario__label'>
                Nombre
              </label>
              <input type='text' autoFocus id='nombre' name='nombre' value={campos.nombre} onChange={handleChange} className='formulario__input' placeholder='Tu nombre' />
            </div>
            <div className='formulario__grupo'>
              <label htmlFor='usuario' className='formulario__label'>
                Usuario
              </label>
              <input type='text' id='usuario' name='usuario' value={campos.usuario} onChange={handleChange} className='formulario__input' placeholder='@' />
            </div>
            <div className='formulario__grupo'>
              <label htmlFor='email' className='formulario__label'>
                Email
              </label>
              <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} className='formulario__input' placeholder='Tu email' />
            </div>
            <div className='formulario__grupo'>
              <label htmlFor='nacimiento' className='formulario__label'>
                Nacimiento
              </label>
              <input type='date' id='nacimiento' name='nacimiento' value={campos.nacimiento} onChange={handleChange} className='formulario__input' placeholder='Tu nacimiento' />
            </div>
            <div className='formulario__grupo'>
              <label htmlFor='descripcion' className='formulario__label'>
                Descripcion
              </label>
              <textarea id='descripcion' name='descripcion' value={campos.descripcion} onChange={handleChange} className='formulario__input' placeholder='Tu descripcion' />
            </div>

            <div className='formulario__botones'>
              <button type='submit' className='formulario__boton btn btn--primary' disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>

          <div className='autorizacion'>
            <Link to={`/user/${user.usuario}`} className='btn btn--2 autorizacion__enlace'>
              Volver al perfil
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}

export default EditarPerfilPage
