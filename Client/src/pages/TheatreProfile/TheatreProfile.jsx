import React, { useEffect } from 'react'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
import { useState } from 'react';
import { getTheatreDetails, updateTheater } from '../../api/TheatreAuth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TheatreProfile = () => {
  const theatre=localStorage.getItem("theatreInfo")
  const theater=JSON.parse(theatre)
  console.log(theater?.theatre?._id)
 
    const [data,setData]=useState()
 
  const [formData,setFormData]=useState({})
  useEffect(async()=>{
    const {data}=await getTheatreDetails(theater.theatre._id)
    console.log(data);
   setFormData(data)
   
    },[theatre])
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}


const handleSubmit=async(e)=>{
  e.preventDefault()
  let UserData=formData
  console.log("haiiii." ,theater.theatre._id,UserData);
const {data}=await updateTheater(theater.theatre._id, UserData)
  console.log("updated",data);
  toast.success("Updated successfully")
  // localStorage.setItem("theatreInfo",data)
}
 const  navigate=useNavigate()
useEffect(()=>{
  if(theatre){
   navigate("/theatreprofile")
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
            <div className="listTile">Theatre Profile </div>
               <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <p style={{marginRight:"29em",color:"var(--hrColor)"}}>Theatre name :</p>
               <input onChange={handleChange} value={formData.theatrename} placeholder='Theatre name...' type="text" name="theatrename" id="" className="infoInput"  style={{width:"50%",marginRight:"2rem",marginTop:"1rem"}}/>
               <p style={{marginRight:"29em",color:"var(--hrColor)"}}>Theatre admin :</p>
                <input onChange={handleChange} value={formData.theatreAdmin}  placeholder='Admin username...'  type="text" name="theatreAdmin" id="" className="infoInput" style={{width:"50%",marginRight:"2rem",marginTop:"1rem"}} />
                <p style={{marginRight:"34em",color:"var(--hrColor)"}}>City :</p>
                <input onChange={handleChange} value={formData.city}  placeholder='City...'  type="text" name="city" id="city" className="infoInput"  style={{width:"50%",marginRight:"2rem",marginTop:"1rem"}} />
                <p style={{marginRight:"27em",color:"var(--hrColor)"}}>Total seat capacity :</p>
                <input onChange={handleChange} value={formData.capacity}  placeholder='Total capacity...' type="Number" name="capacity" id="" className="infoInput"  style={{width:"30%",marginRight:"2rem",marginTop:"1rem"}}/>
                <p style={{marginRight:"31em",color:"var(--hrColor)"}}>Total rows :</p>
                <input onChange={handleChange} value={formData.rows}  placeholder='Total rows...' type="Number" name="rows" id="" className="infoInput"  style={{width:"30%",marginRight:"2rem",marginTop:"1rem"}}/>
                <button onClick={handleSubmit} className="button"  style={{width:"30%",marginRight:"2rem",marginTop:"1rem",height:"2rem"}}>Update</button>
               </div>
          </div>
       
     
     
    </div>
    <ToastContainer />
  </div>
  )
}

export default TheatreProfile
