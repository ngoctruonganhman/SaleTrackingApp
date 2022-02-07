import { FaPhoneAlt, FaCalendarDay, FaRegAddressBook } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Product'
import CardInfo from './CardInfo'

const CustomerDetail = ({
  _id,
  customerFirstName, 
  customerLastName, 
  customerAddress,
  customerPhone,
  customerStartDate,
}) => {
  const {  deleteSale } = useAppContext()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{customerFirstName.charAt(0)}</div>
        <div className='info'>
          <h5>{`${customerFirstName}  ${customerLastName}`}</h5>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <CardInfo icon={<FaPhoneAlt />} text={`phone: ${customerPhone}`} />
          <CardInfo icon={<FaRegAddressBook />} text={`customer Address: ${customerAddress}`} />
          <CardInfo icon={<FaCalendarDay />} text={`customer Start Date: ${customerStartDate}`} />
        </div>
        <footer>
          <div className='actions'>
            
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteSale(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default CustomerDetail
