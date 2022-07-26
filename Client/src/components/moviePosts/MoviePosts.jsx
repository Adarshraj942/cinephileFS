import React from 'react'
import "./MoviePosts.css"
import {useParams} from "react-router-dom"
import SinglePost from '../singlePost/SinglePost'
import {useDispatch ,useSelector} from "react-redux"
import { useEffect } from 'react'
import { getTimelinePosts } from '../../actions/postAction'
const MoviePosts = () => {
  const dispatch =useDispatch()
  const params =useParams()
  const {user} =useSelector((state)=>state.authReducer.authData);
  let {posts,loading}=useSelector((state)=>state.postReducer)

  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[])

  if(!posts) return "No posts"
  if(params.id)posts=posts.filter((post)=>post.userId===params.id)
  return (

    
    <div className='Posts'>
       {loading?"Fetching  posts...!": posts.map((post,id)=>{
           return <SinglePost data={post} id={id}/>
       })}
    </div>
  )
}

export default MoviePosts
