import { AtSymbolSvg, BookmarkSvg, ChatBubbleLeftEllipsisSvg, HeartSvg, ShareSvg } from '../../assets/svgs'

const TweetLoader = () => {
  return (
    <div className='tweet'>
      <div className='tweet--contenido'>
        <div className='tweet--top'>
          <div className='flex w-full'>
            <div className='l__item--loaderAvatar'></div>

            <div className='tweet--top--usuario w-full'>
              <div className='flex w-full mb-10 justify-start '>
                <div className='l-item--loader' style={{ width: '49%', height: 16 }}></div>
                <span>•</span>
                <div className='l-item--loader' style={{ width: '100%', height: 16 }}></div>
              </div>
              <div className='l-item--loader' style={{ width: '100%', height: 16 }}></div>
            </div>
          </div>
        </div>
        <div className='tweet--center'>
          <div className='l-item--loader mb-10' style={{ width: '100%', height: 30 }}></div>

          <div className='l-item--loader' style={{ width: '100%', height: 30 }}></div>
        </div>

        <div className='tweet--botones'>
          <div className='flex'>
            <button>
              <b className='text-white'>0</b>
              <p>Comentario</p>
            </button>

            <button>
              <b className='text-white'>0</b>
              <p>Me encanta</p>
            </button>
          </div>
        </div>
        <div className='tweet--botones'>
          <div className='tweet--botones--div'>
            <button>
              <ChatBubbleLeftEllipsisSvg />
            </button>

            <button>
              <HeartSvg />
            </button>

            <button>
              <BookmarkSvg />
              <span>Guardar</span>
            </button>

            <button>
              <AtSymbolSvg />
              <span>Retuitear</span>
            </button>
          </div>

          <button className='tweet--compartir'>
            <span>Compartir</span>
            <ShareSvg />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TweetLoader
