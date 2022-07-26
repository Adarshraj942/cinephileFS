
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPost } from '../../api/PostRequest'
import "./OuterPost.css"

const OuterPost = () => {
    const [post ,setPost]=useState({})
    const params =useParams()
    useEffect(async()=>{
        const {data}=await getPost(params.id)
        
        setPost(data)
    })
  return (
    <div className='Post'  >
        <img src={post.image?process.env.REACT_APP_PUBLIC_FOLDER+post.image:"" } alt="no image" />
       <div style={{backgroundColor:"#E1AE4A" ,padding:"0.5rem",marginTop:"10px"}}>
       <b> Description:</b><span> {post.desc}</span>
       </div>
       <div style={{backgroundColor:"#E1AE4A" ,padding:"0.5rem",marginTop:"10px"}}>
       <b> {post?.likes?.length}</b><span> people Liked this post</span>
       </div>
       <div style={{backgroundColor:"#E1AE4A" ,padding:"0.5rem",marginTop:"10px"}}>
     <b> {post?.comments?.length}</b><span>  Comments on this post</span>
       </div>
    </div>
  )
}

export default OuterPost
