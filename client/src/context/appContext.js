import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
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

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editProductId: '',
  editSalePersonId: '',
  name: '',
  manufacturer: '',
  style: '',
  purchasePrice: '',
  salePrice: '',
  quantity: '',
  commissionRateOptions: ['5%', '10%', '15%','20%','30%'],
  commissionRate: '5%',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  startDate: '',
  terminationDate: '',
  manager: 'Stan Hu',
  managerListOptions: ['Stan Hu', 'Olivier Chaine', 'Niti Nguyen'],

  product: '',
  salePerson: '',
  customerFirstName: '',
  customerLastName: '',
  customerAddress: '',
  customerPhone: '',
  customerStartDate: '',
  salesDate: '',

  products: [],
  salePersonList: [],
  saleList: [],
  totalProducts: 0,
  totalSalePerson: 0,
  totalSale: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  saleCommission: [],
  stats: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'a-z',
  sortOptions: ['a-z', 'z-a'],
  sortSalePerSon: 'a-z',
  sortSalePersonOptions: ['a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401)
       {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const createProduct = async () => {
    dispatch({ type: CREATE_PRODUCT_BEGIN })
    try {
      const { name, manufacturer, style, purchasePrice, salePrice, quantity, commissionRate } = state
      await authFetch.post('/products', {
        name,
        manufacturer,
        style,
        purchasePrice,
        salePrice,
        quantity,
        commissionRate,
      })
      dispatch({ type: CREATE_PRODUCT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const createSalePerson = async () => {
    dispatch({ type: CREATE_SALE_PERSON_BEGIN })
    try {
      const { firstName, lastName, address, phone, startDate, terminationDate, manager } = state
      await authFetch.post('/saleperson', {
        firstName, lastName, address, phone, startDate, terminationDate, manager
      })
      dispatch({ type: CREATE_SALE_PERSON_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_SALE_PERSON_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const createSale = async () => {
    dispatch({ type: CREATE_SALE_BEGIN })
    try {
      const { product, salePerson, customerFirstName, customerLastName, customerAddress, customerPhone, customerStartDate, salesDate, commissionRate } = state
      await authFetch.post('/sale', {
        product, salePerson, customerFirstName, customerLastName, customerAddress, customerPhone, customerStartDate, salesDate , commissionRate
      })
      dispatch({ type: CREATE_SALE_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_SALE_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getProducts = async () => {
    const { page, search, sort, products: temp } = state

    let url = `/products?page=${page}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { products, totalProducts, numOfPages } = data
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: {
          products,
          totalProducts,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }


  const setProductQuantity = (id) => {
    dispatch({ type: SET_PRODUCT_QUANTITY, payload: { id } })
  }

  const editProductQuantity = async () => {
    const { products, quantity } = state
    try {
   
      dispatch({
        type: EDIT_PRODUCT_QUANTITY,
        // payload: {
        //   products,
        //   id,
        // },
      })
      await authFetch.patch(`/products/${state.editProductId}`, {
        quantity,
      })
    }catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }

  }

  const getSalePerson = async () => {
    const { page, search, sort } = state

    let url = `/saleperson?page=${page}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_SALE_PERSON_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { salePersonList, totalSalePerson, numOfPages } = data
      dispatch({
        type: GET_SALE_PERSON_SUCCESS,
        payload: {
          salePersonList,
          totalSalePerson,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const getSale = async () => {
    const { page, search, sort } = state

    let url = `/sale?page=${page}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_SALE_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { saleList, totalSale, numOfPages } = data
      dispatch({
        type: GET_SALE_SUCCESS,
        payload: {
          saleList,
          totalSale,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const setEditProduct = (id) => {
    dispatch({ type: SET_EDIT_PRODUCT, payload: { id } })
  }

  const setEditSalePerson = (id) => {
    dispatch({ type: SET_EDIT_SALE_PERSON, payload: { id } })
  }

  const setEditSale = (id) => {
    dispatch({ type: SET_EDIT_SALE, payload: { id } })
  }

  const editProduct = async () => {
    dispatch({ type: EDIT_PRODUCT_BEGIN })

    try {
      const { name, manufacturer, style, purchasePrice, salePrice, quantity, commissionRate } = state
      await authFetch.patch(`/products/${state.editProductId}`, {
        manufacturer,
        name,
        style,
        purchasePrice,
        salePrice,
        quantity,
        commissionRate,
      })
      dispatch({ type: EDIT_PRODUCT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_PRODUCT_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const editSalePerson = async () => {
    dispatch({ type: EDIT_SALE_PERSON_BEGIN })

    try {
      const { firstName, lastName, address, phone, startDate, terminationDate, manager } = state
      await authFetch.patch(`/saleperson/${state.editSalePersonId}`, {
        firstName, 
        lastName, 
        address, 
        phone, 
        startDate, 
        terminationDate, 
        manager,
      })
      dispatch({ type: EDIT_SALE_PERSON_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_SALE_PERSON_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const deleteProduct = async (productId) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN })
    try {
      await authFetch.delete(`/products/${productId}`)
      getProducts()
    } catch (error) {
      logoutUser()
    }
  }

  const deleteSalePerson = async (salePersonId) => {
    dispatch({ type: DELETE_SALE_PERSON_BEGIN })
    try {
      await authFetch.delete(`/saleperson/${salePersonId}`)
      getSalePerson()
    } catch (error) {
      logoutUser()
    }
  }

  const deleteSale = async (saleId) => {
    dispatch({ type: DELETE_SALE_BEGIN })
    try {
      await authFetch.delete(`/sale/${saleId}`)
      getSale()
    } catch (error) {
      logoutUser()
    }
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    try {
      const { data } = await authFetch('/sale/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.stats,
          saleCommission: data.saleCommission,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        editProductQuantity,
        setProductQuantity,
        createProduct,
        createSalePerson,
        createSale,
        getProducts,
        getSalePerson,
        getSale,
        setEditProduct,
        setEditSalePerson,
        setEditSale,
        deleteProduct,
        editProductQuantity,
        deleteSalePerson,
        deleteSale,
        editProduct,
        editSalePerson,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
