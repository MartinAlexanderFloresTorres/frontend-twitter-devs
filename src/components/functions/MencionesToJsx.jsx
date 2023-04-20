import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const MencionesToJsx = ({ menciones }) => {
  return menciones.map(({ _id, usuario }) => {
    return (
      <Fragment key={_id}>
        <Link className='azul' to={`/user/${usuario}`}>
          {usuario}
        </Link>{' '}
      </Fragment>
    )
  })
}

export default MencionesToJsx
