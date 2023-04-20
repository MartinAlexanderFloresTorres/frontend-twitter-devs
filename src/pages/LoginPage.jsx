import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POST_LOGIN } from '../services/api/usuario'
import useApp from '../hooks/useApp'

const DEFAULT_CAMPOS = {
  email: '',
  password: ''
}

const LoginPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)

  // USE APP
  const { login } = useApp()

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE LOCATION
  const { state } = useLocation()

  // FUNCIONES
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value.trimStart() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = campos

    // VALIDACIONES
    if (!email) return toast.info('El email es obligatorio')
    if (!password) return toast.info('La contraseña es obligatoria')

    setLoading(true)
    try {
      const { data } = await POST_LOGIN({ email, password })
      toast.success(data.message, { icon: '✅' })
      setCampos(DEFAULT_CAMPOS)

      // GUARDAR TOKEN EN LOCALSTORAGE
      localStorage.setItem('token-twitter', data.token)

      // ACTUALIZAR EL ESTADO
      login(data.usuario)

      // REDIRECCIONAR
      navigate(state?.pathname ?? '/')
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
            <label htmlFor='email' className='formulario__label'>
              Email
            </label>
            <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} className='formulario__input' placeholder='Tu email' />
          </div>

          <div className='formulario__grupo'>
            <label htmlFor='password' className='formulario__label'>
              Contraseña
            </label>
            <input type='password' id='password' name='password' value={campos.password} onChange={handleChange} className='formulario__input' placeholder='Tu contraseña' />
          </div>

          <div className='formulario__botones'>
            <button type='submit' className='formulario__boton btn btn--primary' disabled={loading}>
              {loading ? 'Autenticando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        <div className='autorizacion'>
          <Link to='/recuperacion' className='btn btn--2 autorizacion__enlace'>
            Olvidaste tu contraseña?
          </Link>

          <Link to='/registro' className='btn btn--primary autorizacion__enlace'>
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
