
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddProduct = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    name,
    manufacturer,
    style,
    purchasePrice,
    salePrice,
    quantity,
    commissionRate,
    commissionRateOptions,
    handleChange,
    clearValues,
    createProduct,
    editProduct,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !manufacturer || !style || !purchasePrice || !salePrice) {
      displayAlert()
      return
    }
    if (isEditing) {
      editProduct()
      return
    }
    createProduct()
  }
  const handleProductInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit product' : 'add product'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={handleProductInput}
          />
          <FormRow
            type='text'
            name='manufacturer'
            value={manufacturer}
            handleChange={handleProductInput}
          />
          <FormRow
            type='text'
            labelText='Style'
            name='style'
            value={style}
            handleChange={handleProductInput}
          />
          <FormRow
            type='text'
            name='salePrice'
            value={salePrice}
            handleChange={handleProductInput}
          />
          <FormRow
            type='text'
            name='purchasePrice'
            value={purchasePrice}
            handleChange={handleProductInput}
          />
          <FormRow
            type='text'
            labelText='Quantity on Hand'
            name='quantity'
            value={quantity}
            handleChange={handleProductInput}
          />
          <FormRowSelect
            name='commissionRate'
            value={commissionRate}
            handleChange={handleProductInput}
            list={commissionRateOptions}
          />
     
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddProduct
