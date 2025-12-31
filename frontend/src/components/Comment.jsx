import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ comment }) => {
    return (
        <div className='flex gap-2 items-start my-2'>
            <Avatar className='h-8 w-8'>
                <AvatarImage src={comment?.author?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
                <span className='font-semibold text-sm'>{comment?.author?.username}</span>
                <span className='ml-2 text-sm'>{comment?.text}</span>
            </div>
        </div>
    )
}

export default Comment