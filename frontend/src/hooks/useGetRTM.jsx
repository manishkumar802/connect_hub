import { addMessage } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
    const dispatch = useDispatch();
    const { socket } = useSelector(store => store.socketio);
    
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            console.log('📨 New message received:', newMessage);
            dispatch(addMessage(newMessage));
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        }
    }, [socket, dispatch]);
};
export default useGetRTM;