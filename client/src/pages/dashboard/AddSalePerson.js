import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddSalePerson = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    firstName,
    lastName,
    address,
    phone,
    startDate,
    terminationDate,
    manager,
    managerListOptions,
    handleChange,
    clearValues,
    createSalePerson,
    editSalePerson,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!firstName || !lastName ) {
      displayAlert()
      return
    }
    if (isEditing) {
      editSalePerson()
      return
    }
    createSalePerson()
  }
  const handleSalePersonInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit sale person' : 'add sale person'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* firstName */}
          <FormRow
            type='text'
            name='firstName'
            value={firstName}
            handleChange={handleSalePersonInput}
          />
          {/* lastName */}
          <FormRow
            type='text'
            name='lastName'
            value={lastName}
            handleChange={handleSalePersonInput}
          />
          {/* address */}
          <FormRow
            type='text'
            labelText='address'
            name='address'
            value={address}
            handleChange={handleSalePersonInput}
          />
          {/* phone */}
          <FormRow
            type='text'
            name='phone'
            value={phone}
            handleChange={handleSalePersonInput}
          />
          {/* startDate */}
          <FormRow
            type='text'
            labelText='startDate'
            name='startDate'
            value={startDate}
            handleChange={handleSalePersonInput}
          />
          {/* terminationDate */}
          <FormRow
            type='text'
            labelText='terminationDate'
            name='terminationDate'
            value={terminationDate}
            handleChange={handleSalePersonInput}
          />
          <FormRowSelect
            name='manager'
            labelText='Manager'
            value={manager}
            handleChange={handleSalePersonInput}
            list={managerListOptions}
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

export default AddSalePerson;
