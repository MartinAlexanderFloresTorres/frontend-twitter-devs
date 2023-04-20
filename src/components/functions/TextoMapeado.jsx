import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const TextoMapeado = ({ value }) => {
  const words = value.split(/[\s\n]/)

  const wordsWithRanges = words.map((word, index) => {
    const start = index
    const end = start + word.length
    return { word, range: [start, end] }
  })

  const elements = wordsWithRanges.map(({ word, range }, index) => {
    if (word.startsWith('#') && word.split('#').length === 2) {
      return (
        <Fragment key={index}>
          <Link className='azul' to={`/busqueda?q=${word.substring(1)}`}>
            {word}
          </Link>{' '}
        </Fragment>
      )
    } else if (word.startsWith('@') && word.split('@').length === 2) {
      return (
        <Fragment key={index}>
          <Link className='azul' to={`/user/${word}`}>
            {word}
          </Link>{' '}
        </Fragment>
      )
    } else if (word.startsWith('link*')) {
      const [, enlace, texto] = word.split('=')
      const nuevoTexto = texto.split('-').join(' ')

      return (
        <Fragment key={index}>
          <Link className='azul' to={enlace}>
            {nuevoTexto}
          </Link>{' '}
        </Fragment>
      )
    } else {
      return <Fragment key={index}>{word} </Fragment>
    }
  })

  return <div>{elements}</div>
}

export default TextoMapeado
