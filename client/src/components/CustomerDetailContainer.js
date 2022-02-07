import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import CustomerDetail from './CustomerDetail'
import Wrapper from '../assets/wrappers/ProductsContainer'
import PageBtnContainer from './PageBtnContainer'

const CustomerDetailComponent = () => {
  const {
    getSale,
    saleList,
    isLoading,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getSale()
  }, [])
  if (isLoading) {
    return <Loading center />
  }

  if (saleList.length === 0) {
    return (
      <Wrapper>
        <h2>No customer to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='products'>
        {saleList.map((sale) => {
          return <CustomerDetail key={sale._id} {...sale} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default CustomerDetailComponent
