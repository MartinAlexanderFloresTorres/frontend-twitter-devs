import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POST_RECUPERAR } from '../services/api/usuario'

const DEFAULT_CAMPOS = {
  email: ''
}

const RecuperacionPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_CAMPOS)
  const [loading, setLoading] = useState(false)

  // FUNCIONES
  const handleChange = (e) => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value.trimStart() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email } = campos

    // VALIDACIONES
    if (!email) return toast.info('El email es obligatorio')

    setLoading(true)
    try {
      const { data } = await POST_RECUPERAR({ email })
      toast.success(data.message)
      setCampos(DEFAULT_CAMPOS)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message ?? 'Vuelva a intentarlo, Mas tarde')
    }
    setLoading(false)
  }
  return (
    <section className='principal'>
      <div className='cabezera cabezera--flotante'>
        <h2 className='titulo'>Recuperación</h2>
      </div>

      <div className='contenedor main'>
        <form className='formulario' onSubmit={handleSubmit}>
          <div className='formulario__grupo'>
            <label htmlFor='email' className='formulario__label'>
              Email
            </label>
            <input type='email' id='email' name='email' value={campos.email} onChange={handleChange} className='formulario__input' placeholder='Tu email' />
          </div>

          <div className='formulario__botones'>
            <button type='submit' className='formulario__boton btn btn--primary' disabled={loading}>
              {loading ? 'Recuperando...' : 'Enviar Instrucciones'}
            </button>
          </div>
        </form>

        <div className='autorizacion'>
          <Link to='/login' className='btn btn--2 autorizacion__enlace'>
            Inicia sesión
          </Link>

          <Link to='/registro' className='btn btn--primary autorizacion__enlace'>
            Regístrate
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecuperacionPage
