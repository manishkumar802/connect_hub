import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Heart, UserPlus, MessageCircle } from 'lucide-react'

const Notifications = () => {
    const { likeNotification } = useSelector(store => store.realTimeNotification);

    return (
        <div className='flex-1 my-8 ml-[16%]'>
            <div className='max-w-2xl mx-auto px-4'>
                <h1 className='text-2xl font-bold mb-6'>Notifications</h1>
                
                {likeNotification && likeNotification.length > 0 ? (
                    <div className='space-y-4'>
                        {likeNotification.map((notification, index) => (
                            <Link 
                                key={index}
                                to={`/profile/${notification.userId}`}
                                className='flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors'
                            >
                                <Avatar className='h-12 w-12'>
                                    <AvatarImage src={notification.userDetails?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex-1'>
                                    <p className='text-sm'>
                                        <span className='font-bold'>{notification.userDetails?.username}</span>
                                        {' '}{notification.type === 'follow' ? 'started following you' : notification.type === 'message' ? 'sent you a message' : 'liked your post'}
                                    </p>
                                    <p className='text-xs text-gray-500'>Just now</p>
                                </div>
                                {notification.type === 'follow' ? (
                                    <UserPlus className='text-blue-500' size={20} />
                                ) : notification.type === 'message' ? (
                                    <MessageCircle className='text-green-500' size={20} />
                                ) : (
                                    <Heart className='text-red-500' fill='red' size={20} />
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-20'>
                        <Heart className='mx-auto mb-4 text-gray-300' size={64} />
                        <p className='text-gray-500 text-lg'>No notifications yet</p>
                        <p className='text-gray-400 text-sm mt-2'>When someone likes your post, follows you, or sends a message, you'll see it here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notifications
