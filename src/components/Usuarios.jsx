import Seguidor from './Seguidor'

const Usuarios = ({ usuarios, titulo }) => {
  return (
    <section className='seguidores__container'>
      <div className='cabezera cabezera--flotante'>
        <h2 className='titulo'>{titulo}</h2>
      </div>

      <ul className='seguidores'>{usuarios.length > 0 ? usuarios.map((usuario) => <Seguidor key={usuario._id} seguidor={usuario} />) : <div className='padding'>NO HAY USUARIOS</div>}</ul>
    </section>
  )
}

Usuarios.defaultProps = {
  usuarios: [],
  titulo: ''
}

export default Usuarios
