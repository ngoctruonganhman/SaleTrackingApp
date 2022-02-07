import { FaMoneyBillAlt, FaPercentage, FaMoneyBillWaveAlt , FaSortNumericUp} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Product'
import CardInfo from './CardInfo'

const Product = ({
  _id,
  name,
  manufacturer,
  style,
  purchasePrice,
  salePrice,
  quantity,
  commissionRate,
}) => {
  const { setEditProduct, deleteProduct } = useAppContext()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='info'>
          <h5>{manufacturer}</h5>
          <p>{`${name} ${style}`}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <CardInfo icon={<FaMoneyBillAlt />} text={`purchase Price: ${purchasePrice}`} />
          <CardInfo icon={<FaMoneyBillWaveAlt />} text={`sale Price: ${salePrice}`} />
          <CardInfo icon={<FaSortNumericUp />} text={`quantity: ${quantity}`} />
          <CardInfo icon={<FaPercentage />} text={`Commission Rate: ${commissionRate}`} />
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-product'
              className='btn edit-btn'
              onClick={() => setEditProduct(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProduct(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Product
