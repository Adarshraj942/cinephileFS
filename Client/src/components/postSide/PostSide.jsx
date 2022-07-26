import React from 'react'
import MoviePosts from '../moviePosts/MoviePosts'


import PostShare from '../postShare/PostShare'
import "./PostSide.css"
const PostSide = () => {
  return (
    <div className='PostSide'>
      <PostShare/>
   <MoviePosts/>
    </div>
  )
}

export default PostSide;
