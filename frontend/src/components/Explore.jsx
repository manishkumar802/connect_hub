import React from 'react'
import { useSelector } from 'react-redux'
import { Heart, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Explore = () => {
    const { posts } = useSelector(store => store.post);
    const navigate = useNavigate();

    return (
        <div className='flex-1 my-8 ml-[16%]'>
            <div className='max-w-6xl mx-auto px-4'>
                <h1 className='text-2xl font-bold mb-6'>Explore</h1>
                <div className='grid grid-cols-3 gap-1'>
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div 
                                key={post._id} 
                                className='relative group cursor-pointer'
                                onClick={() => navigate('/')}
                            >
                                <img 
                                    src={post.image} 
                                    alt='post' 
                                    className='w-full aspect-square object-cover' 
                                />
                                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <div className='flex items-center text-white space-x-4'>
                                        <div className='flex items-center gap-2'>
                                            <Heart fill="white" />
                                            <span className='font-bold'>{post.likes.length}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <MessageCircle fill="white" />
                                            <span className='font-bold'>{post.comments.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-3 text-center py-20'>
                            <p className='text-gray-500 text-lg'>No posts to explore yet</p>
                            <p className='text-gray-400 text-sm mt-2'>Create a post or follow users to see content</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Explore
