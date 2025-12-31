import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const {posts} = useSelector(store=>store.post);
  
  if (!posts || posts.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>No posts available</p>
      </div>
    );
  }
  
  return (
    <div>
      {
        posts.map((post) => <Post key={post._id} post={post}/>)
      }
    </div>
  )
}

export default Posts