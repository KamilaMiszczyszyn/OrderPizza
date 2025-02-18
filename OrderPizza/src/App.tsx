import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Layout,
  Login,
  Register,
  Home,
  Menu,
  PersonalData,
  OrderSummary,
  Orders,
  OrdersManagement,
  Contact,
  CustomerFeedback,
  Loader,
  OrdersHistory,
  Dashboard,
  Customers,
  Promotions,
  ThankYou,
  NotFoundPage,
  ScrollToTop
} from './components/index.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/Globals.ts';
import { useState, useEffect } from 'react';
import PrivateRoute from './utils/PrivateRoute.tsx';
import AdminRoute from './utils/AdminRoute.tsx';
import updateData from './utils/updateData.ts';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateData();
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
          <GlobalStyle />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="menu" element={<Menu />} />
              <Route path="contact" element={<Contact />} />
              <Route path="customer-feedback" element={<CustomerFeedback />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="*" element={<Navigate to="/notfound" replace />} />
              <Route path="/notfound" element={<NotFoundPage />} />

              <Route
                path="personal-data"
                element={<PrivateRoute element={<PersonalData />} />}
              />
              <Route
                path="order-summary"
                element={<PrivateRoute element={<OrderSummary />} />}
              />
              <Route
                path="orders"
                element={<PrivateRoute element={<Orders />} />}
              />
              <Route path="thank-you" element={<ThankYou />} />

              <Route
                path="dashboard"
                element={<AdminRoute element={<Dashboard />} />}
              />

              <Route
                path="orders-history"
                element={<AdminRoute element={<OrdersHistory />} />}
              />
              <Route
                path="orders-management"
                element={<PrivateRoute element={<OrdersManagement />} />}
              />
              <Route
                path="customers"
                element={<PrivateRoute element={<Customers />} />}
              />
            </Route>
          </Routes>

          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
