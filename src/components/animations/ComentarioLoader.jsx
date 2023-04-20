const ComentarioLoader = () => {
  return (
    <div className='comentario'>
      <div className='comentario__top--avatar'>
        <div className='l__item--loaderAvatar'></div>
      </div>
      <div className='w-full'>
        <div className='comentario__top'>
          <div className='w-full'>
            <div className='l-item--loader mb-10' style={{ width: '60%', height: 20 }}></div>
            <div className='l-item--loader mb-10' style={{ width: '40%', height: 20 }}></div>
          </div>

          <div className='l-item--loader w-full' style={{ width: '20%', height: 20 }}></div>
        </div>

        <div className='l-item--loader mb-10' style={{ width: '20%', height: 20 }}></div>
        <div className='l-item--loader' style={{ width: '100%', height: 20 }}></div>
      </div>
    </div>
  )
}

export default ComentarioLoader
