import { PhotoSvg } from '../../assets/svgs'

const FormularioComentarioLoader = () => {
  return (
    <section className='formularioTweet formularioTweet--comentario'>
      <div className='flex'>
        <div className='l__item--loaderAvatar'></div>
        <div className='box-compose'>
          <div className='flex'>
            <div className='l-item--loader' style={{ width: '80%', height: 25 }}></div>

            <div className='formularioTweet--botones' style={{ width: '20%' }}>
              <div className='flex'>
                <PhotoSvg />
              </div>

              <div className='l-item--loader' style={{ width: '100%', height: 49, borderRadius: 20 }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormularioComentarioLoader
