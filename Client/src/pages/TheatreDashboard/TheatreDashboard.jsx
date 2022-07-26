import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
const TheatreDashboard = () => {
  const theatre=localStorage.getItem("theatreInfo")
  const theater=JSON.parse(theatre)
  console.log(theater?.theatre?._id)
  const navigate=useNavigate()
  useEffect(()=>{
       if(theatre){
        navigate("/theatre")
       }else{
        navigate("/theatreauth")
       }
  },[])
  return (
    <div className='dashboard'>
    <Sidebar data={true}/>
    <div className="HomeContainer">
      <Navbar/>
      <div className="listContainer">
            <div className="listTile">Dash board</div>
              
          </div>
       
     
     
    </div>
  </div>
  )
}

export default TheatreDashboard
