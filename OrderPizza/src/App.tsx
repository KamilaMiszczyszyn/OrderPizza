import { Routes, Route } from "react-router-dom";
import { Layout, Login, Register, ForgotPassword, Home, Menu, PersonalData, OrderSummary, Orders, OrdersManagement } from "./components";
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/Globals.ts';




function App() {
 

  return (
    <>
      <GlobalStyle/>
         <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/menu" element={<Menu/>} />

            {/* Private routes */}
            <Route path="/personal-data" element={<PersonalData/>} />
            <Route path="/order-summary" element={<OrderSummary/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/orders-management" element={<OrdersManagement/>}/>


          </Route>
        </Routes>  
        <ToastContainer />
    </>
  )
}

export default App
