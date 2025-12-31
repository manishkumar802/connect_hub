import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-1 my-4 sm:my-8 flex flex-col items-center px-2 sm:px-4 lg:pl-[20%]'>
        <Posts/>
    </div>
  )
}

export default Feed