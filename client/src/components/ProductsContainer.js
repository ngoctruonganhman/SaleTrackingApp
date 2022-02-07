import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Product from './Product'
import Wrapper from '../assets/wrappers/ProductsContainer'
import PageBtnContainer from './PageBtnContainer'

const ProductsContainer = () => {
  const {
    getProducts,
    products,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getProducts()
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }
  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No product to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='products'>
        {products.map((item) => {
          return <Product key={item._id} {...item} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default ProductsContainer
