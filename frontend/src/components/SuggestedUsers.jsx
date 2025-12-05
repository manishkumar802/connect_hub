import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import { updateFollowing } from '@/redux/authSlice';

const SuggestedUsers = () => {
    const { suggestedUsers, user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState({});
    const dispatch = useDispatch();

    const followHandler = async (userId) => {
        try {
            setLoading(prev => ({ ...prev, [userId]: true }));
            const isFollowing = user?.following?.includes(userId);
            const res = await authAPI.followUnfollow(userId);
            if (res.data.success) {
                dispatch(updateFollowing({ userId, isFollowing }));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to follow user');
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((suggestedUser) => {
                    const isFollowing = user?.following?.includes(suggestedUser._id);
                    return (
                        <div key={suggestedUser._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${suggestedUser?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={suggestedUser?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${suggestedUser?._id}`}>{suggestedUser?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{suggestedUser?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span 
                                onClick={() => followHandler(suggestedUser._id)}
                                className={`text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6] ${
                                    loading[suggestedUser._id] ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading[suggestedUser._id] 
                                    ? (isFollowing ? 'Unfollowing...' : 'Following...') 
                                    : (isFollowing ? 'Unfollow' : 'Follow')
                                }
                            </span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers