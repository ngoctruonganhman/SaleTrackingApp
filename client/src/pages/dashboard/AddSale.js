import { useEffect, useState } from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddSale = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    product,
    products,
    salePerson,
    customerFirstName, 
    customerLastName, 
    customerAddress, 
    customerPhone, 
    customerStartDate,
    salesDate,
    handleChange,
    clearValues,
    createSale,
    editSalePerson,
    getProducts,
    getSalePerson,
    commissionRate,
    salePersonList,
    editProduct,
    setProductQuantity,
    editProductQuantity,
  } = useAppContext()

  const [rate, setRate] = useState(commissionRate);
  // const [productQuantity, setProductQuantity] = useState(products)

  useEffect(() => {
    getProducts()
    getSalePerson()
  }, [])

  
  const listSalePerson = salePersonList.map(person => `${person.firstName} ${person.lastName}`)
  const listProduct = products.map(sale => sale.name)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!product || !salePerson ) {
      displayAlert()
      return
    }
    if (isEditing) {
      editSalePerson()
      return
    }

    const temp = products.map(item => { 
      if (item.name === product) {
        let quantityInNum = parseInt(item.quantity);
        quantityInNum = quantityInNum - 1;
        item.quantity = quantityInNum.toString();
        setProductQuantity(item._id);
      }
      return item;
    })

    editProductQuantity();

    createSale()

  } 

  const handleSaleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    products.find(product => {
      if (product.name === value){
        setRate(product.commissionRate)
      }
    })
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit sale' : 'add sale'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRowSelect
            name='product'
            value={product}
            handleChange={handleSaleInput}
            list={listProduct}
          />
          
          <FormRow
            type='text'
            labelText='customer first name'
            name='customerFirstName'
            value={customerFirstName}
            handleChange={handleSaleInput}
          />
          <FormRow
            type='text'
            labelText='customer last name'
            name='customerLastName'
            value={customerLastName}
            handleChange={handleSaleInput}
          />
          
          <FormRow
            type='text'
            labelText='customer address'
            name='customerAddress'
            value={customerAddress}
            handleChange={handleSaleInput}
          />
          <FormRow
            type='text'
            labelText='phone'
            name='customerPhone'
            value={customerPhone}
            handleChange={handleSaleInput}
          />
          <FormRow
            type='text'
            labelText='customer start date' 
            name='customerStartDate'
            value={customerStartDate}
            handleChange={handleSaleInput}
          />
          <FormRowSelect
            name='salePerson'
            value={salePerson}
            labelText='Sale Person' 
            handleChange={handleSaleInput}
            list={listSalePerson}
          />
          {/* <FormRow
            type='text'
            name='salePerson'
            labelText='Sale Person' 
            value={salePerson}
            handleChange={handleSaleInput}
          /> */}
          <FormRow
            type='text'
            labelText='commission Rate'
            name='commissionRate'
            value={rate}
            handleChange={handleSaleInput}
          />
          <FormRow
            type='text'
            labelText='sale date'
            name='salesDate'
            value={salesDate}
            handleChange={handleSaleInput}
          />
          
          {/* btn container */}
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

export default AddSale;
