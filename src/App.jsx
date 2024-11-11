import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './pages/auth/AuthContext';
import AllOrders from './pages/AllOrders/AllOrders';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AddProducts from '../src/pages/add-products/products';
import Admin from "../src/pages/Admin/admin";
import Admin_View from "../src/pages/Admin/admin_view";
import EditProduct from "./pages/edit-products/edit-product";
import AppointmentView from "./pages/Admin/appointment_view";
import AdminLogIn from "../src/pages/Admin/adminLogIn";
import Dash from './pages/Dashboard/Dash';
import './App.css'

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<AdminLogIn />} />
                        <Route path="/sunglasses" element={<AdminLogIn />} />
                        <Route path="/product/:id" element={<AdminLogIn />} /> {/* Product Page when clicked will show product data */}
                        <Route path="/eyeglasses" element={<AdminLogIn />} />
                        <Route path="/contactlens" element={<AdminLogIn />} />
                        <Route path="/book" element={<AdminLogIn />} />
                        <Route path="/faq" element={<AdminLogIn />} />
                        <Route path="/login" element={<AdminLogIn />} />
                        <Route path="/sign" element={<AdminLogIn />} />
                        <Route path="/add-products" element={<AddProducts />} /> {/* Product Page when clicked will show product data */}
                        <Route path="/admin-login" element={<AdminLogIn />} />
                        <Route path="/admin" element={<Admin />} />  {/* Product Page when clicked will show product data */}
                        <Route path="/admin-view" element={<Admin_View />} /> {/* Product Page when clicked will show product data */}
                        <Route path="/edit-product/:id" element={<EditProduct />} /> {/* Product Page when clicked will show product data */}
                        <Route path="/appointments" element={<AppointmentView />} /> {/* Product Page when clicked will show product data */}
                        <Route path='/about' element={<AdminLogIn />} />
                        <Route path='/cart' element={<AdminLogIn />} />
                        <Route path='/checkout' element={<AdminLogIn />} />
                        <Route path="/myorders" element={<AdminLogIn />}/>
                        <Route path="/test-admin" element={<Dash />}/>
                        <Route path="/orders" element={<AllOrders />}/> {/* Product Page when clicked will show product data */}
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
