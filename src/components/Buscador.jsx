import { useState } from 'react'
import { MagnifyingGlassSvg, XMarkSvg } from '../assets/svgs'
import { useNavigate } from 'react-router-dom'

const Buscador = ({ autoFocus = false, callback = () => {} }) => {
  // ESTADOS
  const [busqueda, setBusqueda] = useState('')

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const handleChange = (e) => {
    const { value } = e.target
    const regex = /^[a-zA-Z0-9@_]*$/ // Expresión regular que solo permite texto, números, "@" y "_"
    if (regex.test(value)) {
      setBusqueda(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // NAVEGAR A LA PAGINA DE BUSQUEDA
    navigate(`/busqueda?q=${busqueda}`)

    // LIMPIAR EL INPUT
    setBusqueda('')

    callback()
  }

  const handleClear = () => {
    setBusqueda('')
  }

  return (
    <section>
      <div className='cabezera'>
        <h2 className='titulo'>Buscador</h2>
      </div>

      <form className='formulario--1' onSubmit={handleSubmit}>
        {busqueda.length <= 0 ? (
          <button type='button' className='formulario--1__opciones'>
            <MagnifyingGlassSvg />
          </button>
        ) : (
          <button type='button' onClick={handleClear} className='formulario--1__opciones'>
            <XMarkSvg />
          </button>
        )}

        <input type='text' autoFocus={autoFocus} value={busqueda} onChange={handleChange} className='formulario--1__input' placeholder='Buscar' />

        <button type='submit' className={`btn--${busqueda.length < 1 ? '1' : '2'}`} disabled={busqueda.length < 1}>
          Buscar
        </button>
      </form>
    </section>
  )
}

export default Buscador
