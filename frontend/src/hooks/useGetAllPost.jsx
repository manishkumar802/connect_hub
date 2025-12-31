import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postAPI } from "@/lib/api";


const useGetAllPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await postAPI.getAllPosts();
                if (res.data.success) { 
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;