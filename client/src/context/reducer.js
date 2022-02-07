import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  SET_PRODUCT_QUANTITY,
  EDIT_PRODUCT_QUANTITY,
  CLEAR_VALUES,
  CREATE_PRODUCT_BEGIN,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  CREATE_SALE_PERSON_BEGIN,
  CREATE_SALE_PERSON_SUCCESS,
  CREATE_SALE_PERSON_ERROR,
  CREATE_SALE_BEGIN,
  CREATE_SALE_SUCCESS,
  CREATE_SALE_ERROR,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_SALE_PERSON_BEGIN,
  GET_SALE_PERSON_SUCCESS,
  GET_SALE_BEGIN,
  GET_SALE_SUCCESS,
  SET_EDIT_PRODUCT,
  SET_EDIT_SALE_PERSON,
  SET_EDIT_SALE,
  DELETE_PRODUCT_BEGIN,
  DELETE_SALE_PERSON_BEGIN,
  DELETE_SALE_BEGIN,
  EDIT_PRODUCT_BEGIN,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_SALE_PERSON_BEGIN,
  EDIT_SALE_PERSON_SUCCESS,
  EDIT_SALE_PERSON_ERROR,

  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      name: '',
      manufacturer: '',
      style: '',
      purchasePrice: '',
      salePrice: '',
      quantity: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      startDate: '',
      terminationDate: '',
      product: '',
      salePerson: '',
      customerFirstName: '',
      customerLastName: '',
      customerAddress: '',
      customerPhone: '',
      customerStartDate: '',
      salesDate: '',
      
    }
    return {
      ...state,
      ...initialState,
    }
  }
  if (action.type === CREATE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_SALE_PERSON_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === CREATE_SALE_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Product Created!',
    }
  }

  if (action.type === CREATE_SALE_PERSON_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Representative Created!',
    }
  }

  if (action.type === CREATE_SALE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Sale Created!',
    }
  }

  if (action.type === CREATE_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === CREATE_SALE_PERSON_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === CREATE_SALE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }

  if (action.type === GET_SALE_PERSON_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }

  if (action.type === GET_SALE_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      products: action.payload.products,
      totalProducts: action.payload.totalProducts,
      numOfPages: action.payload.numOfPages,
    }
  }

  if (action.type === GET_SALE_PERSON_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      salePersonList: action.payload.salePersonList,
      totalSalePerson: action.payload.totalSalePerson,
      numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === GET_SALE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      saleList: action.payload.saleList,
      totalSale: action.payload.totalSale,
      numOfPages: action.payload.numOfPages,
    }
  }
  if (action.type === SET_EDIT_PRODUCT) {
    const product = state.products.find((product) => product._id === action.payload.id)
    const { _id, name, manufacturer, style, purchasePrice, salePrice, quantity, commissionRate } = product
    return {
      ...state,
      isEditing: true,
      editProductId: _id,
      name,
      manufacturer, 
      style, 
      purchasePrice, 
      salePrice, 
      quantity, 
      commissionRate
    }
  }

  if (action.type === SET_PRODUCT_QUANTITY) {
      const product = state.products.find((product) => product._id === action.payload.id)
      const { _id, quantity } = product

      return {
        ...state,
        editProductId: _id,
        quantity, 
      }
  }

  if (action.type===EDIT_PRODUCT_QUANTITY) {
    return {
      ...state,
    }
  }

  if (action.type === SET_EDIT_SALE_PERSON) {
    const salePerson = state.salePersonList.find((p) => p._id === action.payload.id)
    const { _id, firstName, lastName, address, phone, startDate, terminationDate, manager } = salePerson

    return {
      ...state,
      isEditing: true,
      editSalePersonId: _id,
      firstName, 
      lastName, 
      address, 
      phone, 
      startDate, 
      terminationDate, 
      manager, 
    }
  }



  if (action.type === SET_EDIT_SALE) {
    const sale = state.saleList.find((p) => p._id === action.payload.id)
    const { _id, product, salePerson, customer, salesDate } = sale

    return {
      ...state,
      isEditing: true,
      editSalePersonId: _id,
      product,
       salePerson, 
      customer,
       salesDate,
    }
  }

  if (action.type === DELETE_PRODUCT_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === DELETE_SALE_PERSON_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === DELETE_SALE_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === EDIT_PRODUCT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (action.type === EDIT_SALE_PERSON_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_PRODUCT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Product Updated!',
    }
  }

  if (action.type === EDIT_SALE_PERSON_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Representative Updated!',
    }
  }
  if (action.type === EDIT_PRODUCT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === EDIT_SALE_PERSON_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      saleCommission: action.payload.saleCommission,
    }
  }
  if (action.type === CLEAR_FILTERS) {

    return {
      ...state,
      name: '',
      manufacturer: '',
      style: '',
      purchasePrice: '',
      salePrice: '',
      quantity: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      startDate: '',
      endDate: '',
    }
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer
