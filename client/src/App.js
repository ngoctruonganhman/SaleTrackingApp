import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import {
  AllProducts,
  Profile,
  SharedLayout,
  Stats,
  AddProduct,
  AddSalePerson,
  AllSalePerson,
  AllSale,
  AddSale,
  CustomerDetail,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-products' element={<AllProducts />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='all-sale-person' element={<AllSalePerson />} />
          <Route path='add-sale-person' element={<AddSalePerson />} />
          <Route path='all-sale' element={<AllSale />} />
          <Route path='add-sale' element={<AddSale />} />
          <Route path='customer-detail' element={<CustomerDetail />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
