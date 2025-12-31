import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Add small delay to prevent immediate redirect
        const timer = setTimeout(() => {
            if (!user) {
                navigate("/login", { replace: true });
            }
            setIsLoading(false);
        }, 100);
        
        return () => clearTimeout(timer);
    }, [user, navigate]);
    
    // Show loading or nothing while checking auth
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>;
    }
    
    return user ? <>{children}</> : null;
}

export default ProtectedRoutes;