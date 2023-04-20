import useApp from '../hooks/useApp'

const HistoriaPreview = ({ historias, setHistorias }) => {
  const { avatar, _id, nombre } = historias.creador

  // USE APP
  const { user, handleAbrirModalHistoria } = useApp()

  // VISTO TODAS
  const vistosTodas = historias.historias.every((h) => h.vistosPor.includes(user._id))

  return (
    <button
      className='historia'
      onClick={() => {
        handleAbrirModalHistoria()
        setHistorias(historias.historias)
      }}
    >
      <div className={`historia__preview ${!vistosTodas ? 'historia__preview--activo' : ''}`}>
        <div className='historia__preview__imagen'>
          <img src={avatar.secure_url} alt={`Usuario ${nombre}`} />
        </div>
        <h2>{user._id === _id ? 'Tu' : nombre}</h2>
      </div>
    </button>
  )
}

export default HistoriaPreview
