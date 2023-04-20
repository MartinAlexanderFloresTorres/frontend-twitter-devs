const MensajeLoader = () => {
  return (
    <div className='mensaje mensaje--preview'>
      <div className='flex align-start flex justify-between'>
        <div className='flex w-full'>
          <div className='l__item--loaderAvatar'></div>

          <div className='mensaje__cabezera__item'>
            <div className='l-item--loader mb-10' style={{ width: '40%' }}></div>
            <div className='l-item--loader' style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className='l-item--loader' style={{ width: '10%' }}></div>
      </div>
    </div>
  )
}

export default MensajeLoader
