import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import CropFreeIcon from '@mui/icons-material/CropFree';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Navbar.scss"
const Navbar = () => {
  return (
    <div className='navBar'>
       <div className="wrapper">
         <div className="search">
            <input type="text" placeholder='Search...' name="" id="" />
            <SearchIcon/>
         </div>
         <div className='items'>
            <div className='item'>
             <LanguageIcon className='icon'/>
             English
            </div>
            <div className='item'>
             <Brightness3Icon className='icon'/>
            </div>
            <div className='item'>
             <CropFreeIcon className='icon'/>
            </div>
            <div className='item'>
             <NotificationsIcon className='icon'/>
            </div>
              <div className='item'>
              <ChatBubbleIcon className='icon'/>
             </div>
             <div className='item'>
             <MenuIcon className='icon'/>
            </div>
            <div className='item'>
             <AccountCircleIcon className='icon' style={{color:"var(--hrColor)"}}/>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Navbar
