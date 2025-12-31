import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Heart, UserPlus, MessageCircle } from 'lucide-react'

const Notifications = () => {
    const { likeNotification } = useSelector(store => store.realTimeNotification);

    return (
        <div className='flex-1 my-4 sm:my-8 px-2 sm:px-4 lg:ml-[16%]'>
            <div className='max-w-2xl mx-auto'>
                <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Notifications</h1>
                
                {likeNotification?.length > 0 ? (
                    <div className='space-y-3'>
                        {likeNotification.map((notification, index) => (
                            <Link 
                                key={index}
                                to={`/profile/${notification.userId}`}
                                className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg'
                            >
                                <Avatar className='h-10 w-10'>
                                    <AvatarImage src={notification.userDetails?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm truncate'>
                                        <span className='font-bold'>{notification.userDetails?.username}</span>
                                        {' '}{notification.type === 'follow' ? 'started following you' : 
                                              notification.type === 'message' ? 'sent you a message' : 'liked your post'}
                                    </p>
                                    <p className='text-xs text-gray-500'>Just now</p>
                                </div>
                                {notification.type === 'follow' ? (
                                    <UserPlus className='text-blue-500' size={18} />
                                ) : notification.type === 'message' ? (
                                    <MessageCircle className='text-green-500' size={18} />
                                ) : (
                                    <Heart className='text-red-500' fill='red' size={18} />
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-16'>
                        <Heart className='mx-auto mb-4 text-gray-300' size={48} />
                        <p className='text-gray-500'>No notifications yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notifications
