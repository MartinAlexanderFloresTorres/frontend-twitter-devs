import { MessageLeftSvg, MessageRigthSvg, MessageVistoSvg } from '../../assets/svgs'

const MensajeLoader = ({ emitente }) => {
  return (
    <div className={`mensajeUser mensajeUser__loader ${emitente ? 'rigth' : 'left'} w-full`}>
      <span className={`aff`}>{!emitente ? <MessageLeftSvg /> : <MessageRigthSvg />}</span>

      {emitente ? (
        <span className='sms w-full'>
          <div className='l-item--loader l-item--loader--mensage' style={{ width: '100%', height: 20 }}></div>

          <span>
            <MessageVistoSvg />
          </span>
        </span>
      ) : (
        <span className='sms w-full'>
          <div className='l-item--loader l-item--loader--mensage' style={{ width: '100%', height: 20 }}></div>
        </span>
      )}
    </div>
  )
}

export default MensajeLoader
