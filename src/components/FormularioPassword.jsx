import { useState } from 'react'
import { toast } from 'react-toastify'
import { POST_NUEVO_PASSWORD } from '../services/api/usuario'
import { useNavigate, useParams } from 'react-router-dom'

const DEFAULT_CAMPOS = {
  password: '',
  password2: ''
}

const FormularioPassword = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)

  // USE PARAMS
  const { token } = useParams()

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value.trimStart() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { password, password2 } = campos

    // VALIDACIONES
    if (!password) return toast.info('La contraseña es obligatoria')
    if (password.length < 6) return toast.info('La contraseña debe tener al menos 6 caracteres')
    if (password !== password2) return toast.info('Las contraseñas no coinciden')

    setLoading(true)
    try {
      const { data } = await POST_NUEVO_PASSWORD({ password, token })
      toast.success(data.message)
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

      <div className='contenedor'>
        <form className='formulario' onSubmit={handleSubmit}>
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
      </div>
    </section>
  )
}

export default FormularioPassword
