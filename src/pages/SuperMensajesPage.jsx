import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Mensaje from '../components/Mensaje'
import FormularioMensaje from '../components/FormularioMensaje'
import useObtenerMensajesReceptor from '../hooks/useObtenerMensajesReceptor'
import useApp from '../hooks/useApp'
import { ChevronLeftSvg, EllipsisVerticalSvg } from '../assets/svgs'
import ChatOpciones from '../components/ChatOpciones'
import Loader from '../components/Loader'
import SuperMensajesLoader from '../components/animations/SuperMensajesLoader'

const SuperMensajesPage = () => {
  // ESTADOS
  const [visible, setVisible] = useState(false)
  const [imageCount, setImageCount] = useState(0)

  // USE PARAMS
  const { conversacionId, emisorId, receptorId } = useParams()

  // USE OBTENES MENSAJES BY TO
  const { mensajes, conversacion, loading } = useObtenerMensajesReceptor({ conversacionId, receptorId })

  // USE REF
  const sectionRef = useRef()
  const mensajesRef = useRef()

  // USE APP
  const { user } = useApp()

  const notUser = conversacion.miembros && conversacion.miembros.find((p) => !p._id.includes(user._id))

  // SCROLL TO BOTTOM ON UPDATE
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
      mensajesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [mensajes, imageCount])

  if (loading) {
    return <SuperMensajesLoader />
  }

  // HANDLE IS VISIBLE
  const handleIsVisible = () => setVisible(!visible)

  return (
    <section ref={sectionRef} className='principal principal--mensajes'>
      <div className='cabezera cabezera--flotante juste justify-between padding-10'>
        <div className='flex'>
          <Link to='/mensajes' className='cabezera--flex btn--hover'>
            <ChevronLeftSvg />
          </Link>

          <h2 className='titulo'>
            <div className='flex'>
              {notUser && <Avatar user={notUser} />}
              <span className='webkit-box-1'>{notUser?.usuario}</span>
            </div>
          </h2>
        </div>
        <button className='flex btn--hover' onClick={handleIsVisible}>
          <EllipsisVerticalSvg />
        </button>
      </div>

      <ChatOpciones conversacion={conversacion} handleIsVisible={handleIsVisible} setVisible={setVisible} visible={visible} />

      <div ref={mensajesRef} className={`contenedor__mensajes ${conversacion.bloqueado ? 'contenedor__mensajes--bloqueados' : ''}`}>
        {mensajes.map((mensaje) => (
          <Mensaje key={mensaje._id} mensaje={mensaje} setImageCount={setImageCount} />
        ))}
      </div>

      {conversacion.bloqueado ? (
        <div className='bloqueado'>Chat Bloqueado</div>
      ) : (
        <div className='formulario--flotante'>
          <FormularioMensaje receptor={receptorId === user._id ? emisorId : receptorId} />
        </div>
      )}
    </section>
  )
}

export default SuperMensajesPage
