const SeguidorLoader = () => {
  return (
    <li className='seguidores__item'>
      <div className='seguidores__item--avatar'>
        <div className='l__item--loaderAvatar'></div>
      </div>
      <div className='seguidores__datos w-full'>
        <div className='l-item--loader mb-10' style={{ width: '100%', height: 14 }}></div>
        <div className='l-item--loader' style={{ width: '60%', height: 14 }}></div>
      </div>
      <div className='l-item--loader' style={{ width: '20%', height: 30, borderRadius: 20 }}></div>
    </li>
  )
}

export default SeguidorLoader
