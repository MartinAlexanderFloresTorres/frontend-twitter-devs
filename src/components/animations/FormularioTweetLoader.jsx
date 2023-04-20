import { PhotoSvg } from '../../assets/svgs'

const FormularioTweetLoader = () => {
  return (
    <section className='formularioTweet'>
      <div className='formularioTweet--contenido' style={{ gap: 10 }}>
        <div className='l__item--loaderAvatar'></div>
        <div className='w-full'>
          <div>
            <div className='mb-10'>
              <div className='l-item--loader mb-10' style={{ width: '100%', height: 19 }}></div>
              <div className='l-item--loader mb-10' style={{ width: '80%', height: 19 }}></div>
              <div className='l-item--loader mb-10' style={{ width: '60%', height: 19 }}></div>
              <div className='l-item--loader mb-10' style={{ width: '30%', height: 19 }}></div>
            </div>

            <div className='formularioTweet--botones justify-between w-full'>
              <div className='flex'>
                <PhotoSvg />
              </div>

              <div className='flex w-full'>
                <div className='l-item--loader ml-auto' style={{ width: '25%', height: 50, borderRadius: 20 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormularioTweetLoader
