import { FaPhoneAlt, FaStopwatch, FaCalendarAlt, FaPeopleArrows } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Product'
import CardInfo from './CardInfo'

const SalePerson = ({
  _id,
  firstName,
  lastName,
  phone,
  startDate,
  terminationDate,
  manager,
}) => {
  const { setEditSalePerson, deleteSalePerson } = useAppContext()
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{firstName.charAt(0)}</div>
        <div className='info'>
          <h5>{lastName}</h5>
          <p>{firstName}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <CardInfo icon={<FaPhoneAlt />} text={`phone: ${phone}`} />
          <CardInfo icon={<FaCalendarAlt />} text={`start Date: ${startDate}`} />
          <CardInfo icon={<FaStopwatch />} text={`end Date: ${terminationDate}`} />
          <CardInfo icon={<FaPeopleArrows />} text={`manager: ${manager}`} />
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-sale-person'
              className='btn edit-btn'
              onClick={() => setEditSalePerson(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteSalePerson(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default SalePerson
