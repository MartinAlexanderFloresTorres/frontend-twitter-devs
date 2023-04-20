import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import generarId from '../../helpers/generarId'

const HashtagsToJsx = ({ hashtags }) => {
  return hashtags.map((palabra) => {
    return (
      <Fragment key={generarId()}>
        <Link className='azul' to={`/busqueda?q=${palabra.slice(1, 20)}`}>
          {palabra.slice(0, 20)}
        </Link>{' '}
      </Fragment>
    )
  })
}

export default HashtagsToJsx
