import { useEffect, useRef, useState } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/signup'
import Explore from './components/Explore'
import Notifications from './components/Notifications'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
      {
        path: '/explore',
        element: <ProtectedRoutes><Explore /></ProtectedRoutes>
      },
      {
        path: '/notifications',
        element: <ProtectedRoutes><Notifications /></ProtectedRoutes>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    // Auto-login if token exists but user not in Redux
    const token = localStorage.getItem('token');
    if (token && !user) {
      // Token exists, user should be logged in
      // Let the API calls handle authentication
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        dispatch(setSocket(null));
      }
      return;
    }

    if (socketRef.current) return;

    const socketio = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081', {
      auth: { token: localStorage.getItem('token') },
      query: { userId: user?._id },
      transports: ['websocket', 'polling'],
      withCredentials: true
    });

    socketRef.current = socketio;
    dispatch(setSocket(socketio));

    socketio.on('getOnlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socketio.on('notification', (notification) => {
      dispatch(setLikeNotification(notification));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <div className="min-h-screen">
        <RouterProvider router={browserRouter} />
      </div>
    </>
  )
}

export default App