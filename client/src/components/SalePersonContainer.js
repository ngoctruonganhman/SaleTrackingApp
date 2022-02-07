import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import SalePerson from './SalePerson'
import Wrapper from '../assets/wrappers/ProductsContainer'
import PageBtnContainer from './PageBtnContainer'

const SalePersonContainer = () => {
  const {
    getSalePerson,
    salePersonList,
    isLoading,
    page,
    totalSalePerson,
    search,
    sort,
    numOfPages,
} = useAppContext()
  useEffect(() => {
    getSalePerson()
  }, [page, search, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (salePersonList.length === 0) {
    return (
      <Wrapper>
        <h2>No Representative to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalSalePerson} representative{salePersonList.length > 1 && 's'} found
      </h5>
      <div className='products'>
        {salePersonList.map((salePerson) => {
          return <SalePerson key={salePerson._id} {...salePerson} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default SalePersonContainer;
