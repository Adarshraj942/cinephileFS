import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../logoSeach/LogoSearch'
import "../profileside/ProfileSide.css"
const ProfileLeft = () => {
  return (
    <div className='ProfileSide'>
      <LogoSearch/>
      <InfoCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
