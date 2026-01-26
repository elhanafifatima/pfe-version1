import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ClientForm from './pages/ClientForm';

// Layout Wrapper
const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 200px)', padding: '2rem 0' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

function App() {
    return (
        <Router>
            <CartProvider>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<ClientForm />} />
                    </Route>
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;
