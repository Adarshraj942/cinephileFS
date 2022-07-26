import React from 'react'
import "./SinglePost.css"
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'

import COmmentModal from '../COmmentModal'
import { useNavigate } from 'react-router-dom'
import LinkModal from '../LinkModal'
const SinglePost = ({data}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [liked,setLiked]=useState(data.likes.includes(user._id))
  const [likes,setLikes]=useState(data.likes.length)
  const [modalOpened,setModalOpened]=useState(false);
  const [modalOpened2,setModalOpened2]=useState(false);
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate(`/post/${data._id}`)
  }
  const handleLike=()=>{
    setLiked((prev)=>!prev)

    likePost(data._id,user._id)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev + 1)
  }
  return (
    <div className="Post">
       
        <img src={data.image?process.env.REACT_APP_PUBLIC_FOLDER+data.image:"" } onClick={handleClick}alt="no image" />



        <div className="PostReact">
            <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
            <img src={Comment} alt=""onClick={()=>setModalOpened(true)} />
            <COmmentModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={data}/>
            <img src={Share} alt=""  onClick={()=>setModalOpened2(true)}/>
            <LinkModal modalOpened2={modalOpened2} setModalOpened2={setModalOpened2} data={data}/>
        </div>

        <span style={{color:"var(--gray)" ,fontSize:"12px"}}> {likes} Likes</span>
        <div className="details">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>

        </div>
    </div>
  )
}

export default SinglePost
