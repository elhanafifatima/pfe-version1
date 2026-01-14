import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const saved = localStorage.getItem('vitalis_user');
        if (saved) setUser(JSON.parse(saved));
        setLoading(false);
    }, []);
    const login = (u) => { setUser(u); localStorage.setItem('vitalis_user', JSON.stringify(u)); };
    const logout = () => { setUser(null); localStorage.removeItem('vitalis_user'); localStorage.removeItem('vitalis_cart'); };
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
