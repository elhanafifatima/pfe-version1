import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ProfileSanteProvider, useHealth } from './context/HealthContext';
import { CartProvider } from './context/CartContext';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProfileSante from './pages/ProfileSante';
import ProductImport from './pages/ProductImport';

const HealthGuard = () => {
    const { hasProfile } = useHealth();
    return hasProfile ? <Outlet /> : <Navigate to="/ProfileSante" replace />;
};

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1, backgroundColor: '#f9fafb' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <ProfileSanteProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/ProfileSante" element={<ProfileSante />} />
                            <Route path="/import" element={<ProductImport />} />

                            {/* Restricted Routes - Need Health Profile */}
                            <Route element={<HealthGuard />}>
                                <Route path="/products" element={<Products />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </CartProvider>
            </ProfileSanteProvider>
        </Router>
    );
}

export default App;
