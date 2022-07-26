import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import PostSide from '../../components/postSide/PostSide'
import ProfileCard from '../../components/profileCard/ProfileCard'

import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/rightSide/RightSide'
import "./Profile.css"

const Profile = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params=useParams()
  const navigate=useNavigate()
useEffect(()=>{
  if(user._id===params.id){
    navigate(`/profile/${user._id}`)
  }else{
   navigate("*")
  }
},[user])

  return (
    <div className='Profile'>
      <ProfileLeft/>
      <div className="profile-center">
          <ProfileCard location="profilePage"/>
          <PostSide/>
         
      </div>
      <RightSide/>
    </div>
  )
}

export default Profile
