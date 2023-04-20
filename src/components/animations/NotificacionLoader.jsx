import { EllipsisHorizontalSvg } from '../../assets/svgs'

const NotificacionLoader = () => {
  return (
    <div className={`notificaciones__item`}>
      <div className='notificaciones__item__cabezera flex justify-between'>
        <div className='w-full'>
          <div className='l-item--loader mb-10' style={{ width: '100%' }}></div>
          <div className='l-item--loader' style={{ width: '10%' }}></div>
        </div>

        <div className='btn--hover'>
          <EllipsisHorizontalSvg />
        </div>
      </div>
    </div>
  )
}

export default NotificacionLoader
