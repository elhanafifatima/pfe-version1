import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const MainLayout = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar /><main style={{ flexGrow: 1 }}><Outlet /></main><Footer />
    </div>
);

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </Route>
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}
export default App;
