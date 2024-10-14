import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Navbar from './components/Navbar';

import Home from './pages/home';
import FoodAndBeveragesPage from './pages/foodbev';
import OfficeAndStationeryPage from './pages/offandsta';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import Others from './pages/others';
import ProductsList from './pages/ProductsList';
import ProductPropertyPage from './components/ProductPropertiesPage';
import CartPage from './components/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './UserContext';
import AdminOrders from './pages/AdminOrders';
// import OrderPage from './components/orderPage';
import CabBookingForm from './pages/cabbook';
import AdminCabRequests from './pages/AdminCabRequests';
import AdditionalRequirementsPage from './pages/AdminAdditionalReq';
function App() {
    return (
        <UserProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/OISERV-Personal/:username" element={<Home />} /> 
                {/* use this to stay in user */}
                <Route path="/food-and-beverages" element={<FoodAndBeveragesPage />} /> 
                <Route path="/office&stationary" element={< OfficeAndStationeryPage/>} /> 
                <Route path="/others"element={<Others/>}/>
                {/* <Route path="/OISERV-Personal/orderpage" element={<OrderPage />} /> */}
                <Route path="/ProductsList"element={<ProductsList/>}/>
                <Route path="/productproperties"element={<ProductPropertyPage/>}/>
                <Route path="/OISERV-Personal/cart" element={<CartPage />} />
                <Route path="OISERV-Personal/admin/orders" element={<AdminOrders />} />
                <Route path="/cabbooking" element={<CabBookingForm />} />
                <Route path="OISERV-Personal/admin/cabbookings" element={<AdminCabRequests />} />
                <Route path="OISERV-Personal/admin/additionalreq" element={<AdditionalRequirementsPage />} />
                </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
