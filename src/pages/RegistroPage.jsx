import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POST_CREAR } from '../services/api/usuario'
import generarUsuario from '../helpers/generarUsuario'

const DEFAULT_CAMPOS = {
  nombre: '',
  usuario: '',
  nacimiento: '',
  email: '',
  password: '',
  password2: ''
}

const RegistroPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'nombre') {
      if (value.length > 36) return
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
    const { nombre, usuario, nacimiento, email, password, password2 } = campos

    // VALIDACIONES
    if (!nombre) return toast.info('El nombre es obligatorio')
    if (nombre.length > 36) return toast.info('Nombre del usuario maximo 36 caracteres')

    if (!usuario) return toast.info('El usuario es obligatorio')
    if (!email) return toast.info('El email es obligatorio')
    if (!nacimiento) return toast.info('La fecha de nacimiento es obligatoria')
    // Debe tener mayor de 16 años
    if (new Date(nacimiento).getFullYear() > new Date().getFullYear() - 16) return toast.info('Debes tener mayor de 16 años')
    if (!password) return toast.info('La contraseña es obligatoria')
    if (password.length < 6) return toast.info('La contraseña debe tener al menos 6 caracteres')
    if (password !== password2) return toast.info('Las contraseñas no coinciden')

    setLoading(true)
    try {
      const { data } = await POST_CREAR({ nombre, nacimiento, email: email.trim(), password, usuario })
      toast.success(data.message, { icon: '📨' })
      setCampos(DEFAULT_CAMPOS)
      // REDIRECCIONAR
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }

  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <h2 className='titulo'>Registro</h2>
      </div>

      <div className='contenedor main'>
        <form className='formulario' onSubmit={handleSubmit}>
          <div className='formulario__grupo'>
            <label htmlFor='nombre' className='formulario__label'>
              Nombre
            </label>
            <input type='text' id='nombre' name='nombre' value={campos.nombre} onChange={handleChange} className='formulario__input' placeholder='Tu nombre' />
          </div>
          <div className='formulario__grupo'>
            <label htmlFor='nombre' className='formulario__label'>
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
            <label htmlFor='password' className='formulario__label'>
              Contraseña
            </label>
            <input type='password' id='password' name='password' value={campos.password} onChange={handleChange} className='formulario__input' placeholder='Tu contraseña' />
          </div>
          <div className='formulario__grupo'>
            <label htmlFor='password2' className='formulario__label'>
              Repetir contraseña
            </label>
            <input type='password' id='password2' name='password2' value={campos.password2} onChange={handleChange} className='formulario__input' placeholder='Repite tu contraseña' />
          </div>

          <div className='formulario__botones'>
            <button type='submit' className='formulario__boton btn btn--primary' disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <div className='autorizacion'>
          <Link to='/recuperacion' className='btn btn--2 autorizacion__enlace'>
            Olvidaste tu contraseña?
          </Link>

          <Link to='/login' className='btn btn--primary autorizacion__enlace'>
            Inicia sesión
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RegistroPage
