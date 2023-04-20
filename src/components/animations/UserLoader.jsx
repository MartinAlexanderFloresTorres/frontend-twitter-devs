import { CakeSvg, CalendarDaysSvg } from '../../assets/svgs'

const UserLoader = () => {
  return (
    <div>
      <div className='usuario'>
        <div className='usuario__banner l-item--loader' style={{ width: '100%', height: 300 }}></div>

        <div className='usuario__top'>
          <div className='usuario__top--avatar l-item--loader' style={{ width: 150, height: 150 }}></div>
        </div>

        <div className='usuario__informacion'>
          <div className='mb-10 l-item--loader nombre' style={{ width: '60%', height: 18 }}></div>
          <div className='mb-10 l-item--loader' style={{ width: '30%', height: 18 }}></div>
          <div className='mb-10 l-item--loader' style={{ width: '50%', height: 18 }}></div>
          <div className='mb-10 l-item--loader' style={{ width: '80%', height: 18 }}></div>

          <div className='calendario'>
            <CalendarDaysSvg />
            <div className='l-item--loader' style={{ width: '50%', height: 18 }}></div>
          </div>

          <div className='calendario'>
            <CakeSvg />
            <div className='l-item--loader' style={{ width: '50%', height: 18 }}></div>
          </div>

          <div className='indicadores flex w-full'>
            <div className='flex w-full'>
              <b>0</b>
              <div className='l-item--loader' style={{ width: '40%', height: 18 }}></div>
            </div>
            <div className='flex w-full'>
              <b>0</b>
              <div className='l-item--loader' style={{ width: '40%', height: 18 }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLoader
