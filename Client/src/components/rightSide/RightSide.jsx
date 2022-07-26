import React, { useState } from 'react'
import "./RightSide.css"
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import {UilSetting} from "@iconscout/react-unicons"
import TrendCard from '../trendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import { Link } from 'react-router-dom'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
const RightSide = () => {
  const [modalOpened,setModalOpened]=useState(false);
  return (
    <div className='RightSide'>
     <div className="navIcons">
     
     <Tippy content="Home" >
      <Link to="../home"> <img src={Home}  alt="" /></Link>
      </Tippy> 
      <Tippy content="Movie" >
         <Link to="../trending"> <WhatshotIcon/></Link>
         </Tippy>
         <Tippy content="Chat" > 
         <Link to="../chat">
         <img src={Comment} alt="" />
         </Link>
         </Tippy>
         <Tippy content="Room" >

         <Link to="../room">
         <MeetingRoomIcon/>
         </Link>
         </Tippy>
     </div>

     <TrendCard/>

     <button className="button r-button" 
     onClick={()=>setModalOpened(true)}
     >
       Share
     </button>
     <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>

    </div>
  )
}

export default RightSide
