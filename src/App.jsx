import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Navbar from './components/Navbar';
import About from './pages/about';
import Home from './pages/home';
import FoodAndBeveragesPage from './pages/foodbev';
import OfficeAndStationeryPage from './pages/offandsta';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import Others from './pages/others';
import OrderPage from './components/orderPage';
import ProductsList from './pages/ProductsList';
import ProductPropertyPage from './components/ProductPropertiesPage';
import CartPage from './components/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home />} />
                <Route path="/food-and-beverages" element={<FoodAndBeveragesPage />} /> 
                <Route path="/office&stationary" element={< OfficeAndStationeryPage/>} /> 
                <Route path="/others"element={<Others/>}/>
                <Route path="/orderpage" element={<OrderPage />} />
                <Route path="/ProductsList"element={<ProductsList/>}/>
                <Route path="/productproperties"element={<ProductPropertyPage/>}/>
                <Route path="/cart" element={<CartPage />} />
                </Routes>
        </Router>
    );
}

export default App;
