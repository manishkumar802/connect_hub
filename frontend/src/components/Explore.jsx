import React from 'react'
import { useSelector } from 'react-redux'
import { Heart, MessageCircle } from 'lucide-react'

const Explore = () => {
    const { posts } = useSelector(store => store.post);

    return (
        <div className='flex-1 my-4 sm:my-8 px-2 sm:px-4 lg:ml-[16%]'>
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Explore</h1>
                <div className='grid grid-cols-3 gap-1'>
                    {posts?.map((post) => (
                        <div key={post._id} className='relative group cursor-pointer'>
                            <img 
                                src={post.image} 
                                alt='post' 
                                className='w-full aspect-square object-cover' 
                            />
                            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity'>
                                <div className='flex items-center text-white space-x-3'>
                                    <div className='flex items-center gap-1'>
                                        <Heart fill="white" size={16} />
                                        <span className='text-sm font-bold'>{post.likes?.length || 0}</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <MessageCircle fill="white" size={16} />
                                        <span className='text-sm font-bold'>{post.comments?.length || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Explore
