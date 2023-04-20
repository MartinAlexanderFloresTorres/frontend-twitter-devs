import React from 'react'
import Buscador from './Buscador'
import Usuarios from './Usuarios'
import useApp from '../hooks/useApp'
import SeguidorLoader from './animations/SeguidorLoader'

const BarraLateral = () => {
  const { user, loadingUser } = useApp()
  return (
    <section className='barra'>
      <Buscador />

      {loadingUser ? (
        <section>
          <div className='cabezera'>
            <h2 className='titulo'>Seguidores</h2>
          </div>

          <ul className='seguidores'>
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
            <SeguidorLoader />
          </ul>
        </section>
      ) : (
        user && <Usuarios titulo='Seguidores' usuarios={user.seguidores} />
      )}
    </section>
  )
}

export default BarraLateral
