import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '@/redux/authSlice';

const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChecking, setIsChecking] = useState(true);
    
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            
            if (token && !user) {
                // Token exists but user not in Redux, keep user logged in
                setIsChecking(false);
                return;
            }
            
            if (!token && !user) {
                navigate("/login", { replace: true });
            }
            
            setIsChecking(false);
        };
        
        checkAuth();
    }, [user, navigate, dispatch]);
    
    // Don't render anything while checking to prevent flash
    if (isChecking) {
        return <div style={{visibility: 'hidden'}}>{children}</div>;
    }
    
    // Show content if user exists OR token exists
    return (user || localStorage.getItem('token')) ? children : null;
}

export default ProtectedRoutes;