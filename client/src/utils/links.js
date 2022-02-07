import { IoBarChartSharp, IoAdd, IoPersonAddSharp, IoPeopleSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaDollarSign, FaInbox } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all product', path: 'all-products', icon: <MdQueryStats /> },
  { id: 3, text: 'add product', path: 'add-product', icon: <IoAdd /> },
  { id: 4, text: 'all sale person', path: 'all-sale-person', icon: <MdQueryStats /> },
  { id: 5, text: 'add sale person', path: 'add-sale-person', icon: <IoPersonAddSharp /> },
  { id: 6, text: 'all sale', path: 'all-sale', icon: <FaInbox /> },
  { id: 7, text: 'add sale', path: 'add-sale', icon: <FaDollarSign /> },
  { id: 8, text: 'customer detail', path: 'customer-detail', icon: <IoPeopleSharp /> },
  { id: 9, text: 'profile', path: 'profile', icon: <ImProfile /> },
]

export default links
