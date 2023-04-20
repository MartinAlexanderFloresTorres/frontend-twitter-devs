import { useEffect } from 'react'
import useBuscarUsuarios from '../hooks/useBuscarUsuarios'
import AutoCompletadoItem from './AutoCompletadoItem'
import { LoaderSvg } from '../assets/svgs'

const AutoCompletado = ({ palabra, handleSeleccion, top, left, right }) => {
  // USE BUSCAR USUARIOS
  const { buscarUsuario, usuarios, loading } = useBuscarUsuarios()

  useEffect(() => {
    if (palabra) {
      buscarUsuario({ q: palabra })
    }
  }, [palabra])

  return (
    <div className='autocomplete-panel' style={{ top, left, right }}>
      <ul className='autocomplete-items'>
        {loading ? (
          <div className='flex autocomplete-item'>
            <LoaderSvg />
          </div>
        ) : usuarios.length > 0 ? (
          usuarios.map((usuario) => <AutoCompletadoItem key={usuario._id} usuario={usuario} handleSeleccion={handleSeleccion} />)
        ) : (
          <p className='autocomplete-item flex w-full text-center'>No users</p>
        )}
      </ul>
    </div>
  )
}

export default AutoCompletado
