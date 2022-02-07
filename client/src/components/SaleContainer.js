import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Sale from './Sale'
import Wrapper from '../assets/wrappers/ProductsContainer'
import PageBtnContainer from './PageBtnContainer'

const SaleContainer = () => {
  const {
    getSale,
    saleList,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getSale()
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }


  if (saleList.length === 0) {
    return (
      <Wrapper>
        <h2>No sales to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='products'>
        {saleList.map((sale) => {
          return <Sale key={sale._id} {...sale} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default SaleContainer
