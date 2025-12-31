import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';
import { updateFollowing } from '@/redux/authSlice';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { userProfile, user } = useSelector(store => store.auth);

  // Fix: More robust comparison for profile ownership
  const isLoggedInUserProfile = user?._id === userProfile?._id || 
                               user?._id === userId || 
                               (!userId && userProfile?._id === user?._id);
  const isFollowing = user?.following?.includes(userProfile?._id);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const followHandler = async () => {
    try {
      setLoading(true);
      const res = await authAPI.followUnfollow(userProfile?._id);
      if (res.data.success) {
        dispatch(updateFollowing({ userId: userProfile?._id, isFollowing }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to follow user');
    } finally {
      setLoading(false);
    }
  };

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className='flex max-w-5xl justify-center mx-auto px-2 sm:px-4 lg:pl-10'>
      <div className='flex flex-col gap-6 sm:gap-10 lg:gap-20 p-2 sm:p-4 lg:p-8 w-full'>
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-8'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-24 w-24 sm:h-32 sm:w-32'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-4 sm:gap-5'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                <span className='text-lg sm:text-xl font-semibold'>{userProfile?.username}</span>
                <div className='flex flex-wrap gap-2'>
                  {
                    isLoggedInUserProfile ? (
                      <>
                        <Link to="/account/edit">
                          <Button variant='secondary' className='hover:bg-gray-200 h-8 text-xs sm:text-sm px-3'>
                            Edit profile
                          </Button>
                        </Link>
                        <Button variant='secondary' className='hover:bg-gray-200 h-8 text-xs sm:text-sm hidden sm:inline-flex'>
                          View archive
                        </Button>
                        <Button variant='secondary' className='hover:bg-gray-200 h-8 text-xs sm:text-sm hidden sm:inline-flex'>
                          Ad tools
                        </Button>
                      </>
                    ) : (
                      isFollowing ? (
                        <>
                          <Button 
                            onClick={followHandler}
                            disabled={loading}
                            variant='secondary' 
                            className='h-8 text-xs sm:text-sm'
                          >
                            {loading ? 'Unfollowing...' : 'Unfollow'}
                          </Button>
                          <Button variant='secondary' className='h-8 text-xs sm:text-sm'>Message</Button>
                        </>
                      ) : (
                        <Button 
                          onClick={followHandler}
                          disabled={loading}
                          className='bg-[#0095F6] hover:bg-[#3192d2] h-8 text-xs sm:text-sm'
                        >
                          {loading ? 'Following...' : 'Follow'}
                        </Button>
                      )
                    )
                  }
                </div>
              </div>
              <div className='flex items-center gap-4 text-sm sm:text-base'>
                <p><span className='font-semibold'>{userProfile?.posts?.length || 0} </span>posts</p>
                <p><span className='font-semibold'>{userProfile?.followers?.length || 0} </span>followers</p>
                <p><span className='font-semibold'>{userProfile?.following?.length || 0} </span>following</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-sm sm:text-base'>{userProfile?.bio || 'bio here...'}</span>
                <Badge className='w-fit' variant='secondary'>
                  <AtSign className='w-3 h-3' /> 
                  <span className='pl-1 text-xs'>{userProfile?.username}</span>
                </Badge>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm'>
            <span 
              className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold border-t-2 border-black' : ''}`} 
              onClick={() => handleTabChange('posts')}
            >
              POSTS
            </span>
            <span 
              className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold border-t-2 border-black' : ''}`} 
              onClick={() => handleTabChange('saved')}
            >
              SAVED
            </span>
            <span className='py-3 cursor-pointer hidden sm:inline'>REELS</span>
            <span className='py-3 cursor-pointer hidden sm:inline'>TAGS</span>
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {
              displayedPost?.map((post) => {
                return (
                  <div key={post?._id} className='relative group cursor-pointer'>
                    <img 
                      src={post.image} 
                      alt='postimage' 
                      className='rounded-sm my-1 sm:my-2 w-full aspect-square object-cover' 
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center text-white space-x-2 sm:space-x-4'>
                        <button className='flex items-center gap-1 sm:gap-2 hover:text-gray-300'>
                          <Heart className='w-4 h-4 sm:w-5 sm:h-5' />
                          <span className='text-xs sm:text-sm'>{post?.likes?.length || 0}</span>
                        </button>
                        <button className='flex items-center gap-1 sm:gap-2 hover:text-gray-300'>
                          <MessageCircle className='w-4 h-4 sm:w-5 sm:h-5' />
                          <span className='text-xs sm:text-sm'>{post?.comments?.length || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile