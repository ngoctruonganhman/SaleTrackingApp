import { FaPhoneAlt, FaStopwatch, FaPercentage, FaPeopleArrows } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Product'
import CardInfo from './CardInfo'

const Sale = ({
  _id,
  product,
  salePerson,
  customerFirstName, 
  customerLastName, 
  commissionRate,
  salesDate,
  customerPhone,
}) => {
  const {  deleteSale } = useAppContext()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{product.charAt(0)}</div>
        <div className='info'>
          <h5>{product}</h5>
          <p>{salePerson}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <CardInfo icon={<FaPhoneAlt />} text={`phone: ${customerPhone}`} />
          <CardInfo icon={<FaStopwatch />} text={`salesDate: ${salesDate}`} />
          <CardInfo icon={<FaPeopleArrows />} text={`customer: ${customerFirstName} ${customerLastName}`} />
          <CardInfo icon={<FaPercentage />} text={`Commission Rate: ${commissionRate}`} />
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

export default Sale
