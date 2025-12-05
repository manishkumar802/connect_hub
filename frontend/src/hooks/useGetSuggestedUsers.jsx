import { setSuggestedUsers } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authAPI } from "@/lib/api";


const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await authAPI.getSuggestedUsers();
                console.log('Suggested users response:', res.data);
                if (res.data.success) { 
                    dispatch(setSuggestedUsers(res.data.users));
                    console.log('Suggested users set:', res.data.users.length);
                }
            } catch (error) {
                console.error('Error fetching suggested users:', error);
            }
        }
        fetchSuggestedUsers();
    }, [dispatch]);
};
export default useGetSuggestedUsers;