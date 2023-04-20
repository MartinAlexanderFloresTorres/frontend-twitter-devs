const AutoCompletadoItem = ({ usuario, handleSeleccion }) => {
  const { _id, avatar, nombre, usuario: user } = usuario

  return (
    <li>
      <button
        className='autocomplete-item'
        onClick={() => {
          handleSeleccion({ _id, user })
        }}
      >
        <div className='account-body'>
          <div className='account-avatar'>
            <img src={avatar.secure_url} alt='avatar' />
          </div>

          <div>
            <p className='nombre'>{nombre}</p>
            <p className='usuario'>{user}</p>
          </div>
        </div>
      </button>
    </li>
  )
}

export default AutoCompletadoItem
