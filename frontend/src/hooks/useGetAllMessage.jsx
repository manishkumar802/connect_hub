import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageAPI } from "@/lib/api";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.auth);
    useEffect(() => {
        const fetchAllMessage = async () => {
            try {
                console.log('📬 Fetching messages for user:', selectedUser?._id);
                const res = await messageAPI.getMessages(selectedUser?._id);
                console.log('📬 Messages fetched:', res.data.messages.length);
                if (res.data.success) {  
                    dispatch(setMessages(res.data.messages));
                }
            } catch (error) {
                console.error('❌ Error fetching messages:', error);
            }
        }
        if (selectedUser) {
            fetchAllMessage();
        }
    }, [selectedUser, dispatch]);
};
export default useGetAllMessage;