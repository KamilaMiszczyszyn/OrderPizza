import { Routes, Route } from "react-router-dom";
import { Layout, Login, Register, Home, Menu, PersonalData, OrderSummary, Orders, OrdersManagement, Contact, CustomerFeedback, Loader } from "./components/index.ts"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/Globals.ts';
import { useState, useEffect } from "react"; 



function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 2000); 
    }, []);

    return ( 
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <GlobalStyle/>

                    <Routes>
                        <Route path="/" element={<Layout />}>
                            {/* Public routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/customer-feedback" element={<CustomerFeedback />} />

                            {/* Private routes */}
                            <Route path="/personal-data" element={<PersonalData />} />
                            <Route path="/order-summary" element={<OrderSummary />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/orders-management" element={<OrdersManagement />} />
                        </Route>
                    </Routes>  
                    <ToastContainer />
                </>
            )}
        </>
    );
}

export default App;
