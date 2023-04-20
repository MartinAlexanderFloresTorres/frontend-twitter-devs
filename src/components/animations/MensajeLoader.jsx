import { MessageLeftSvg, MessageRigthSvg } from '../../assets/svgs'

const MensajeLoader = ({ emitente }) => {
  return (
    <div className='mensaje--padding'>
      <div className={`mensajeUser w-full mensaje--${emitente ? 'emitente' : 'receptor'}`}>
        {emitente ? (
          <div className='aff'>
            <MessageRigthSvg />
          </div>
        ) : (
          <div className='aff'>
            <MessageLeftSvg />
          </div>
        )}
        <div className='mensaje__cuerpo w-full'>
          <div className='l-item--loader l-item--loader--mensage' style={{ width: '100%', height: 20 }}></div>
        </div>
        <div className='l-item--loader l-item--loader--mensage' style={{ width: '10%', height: 20 }}></div>
      </div>
    </div>
  )
}

export default MensajeLoader
