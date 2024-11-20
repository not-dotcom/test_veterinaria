// src/context/AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar token al cargar
        const verifyAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/verify', {
                    credentials: 'include'
                });
                setIsAuthenticated(response.ok);
            } catch (error) {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };
        
        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);