import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        
        const timer = setTimeout(() => {
            if (!user && !token) {
                navigate("/login", { replace: true });
            }
            setIsLoading(false);
        }, 50);
        
        return () => clearTimeout(timer);
    }, [user, navigate]);
    
    if (isLoading) {
        return null; // Prevent flash
    }
    
    return user || localStorage.getItem('token') ? <>{children}</> : null;
}

export default ProtectedRoutes;