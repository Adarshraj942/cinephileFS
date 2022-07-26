import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

const Tables = () => {
  const[users,setUsers]=useState([]);
  const [search,setSearch]=useState("");
  const [filterUsers,setFilteredUsers]=useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
  const adminInfo=localStorage.getItem('adminInfo')
  if(adminInfo){
  
   navigate("/listuser")
  }else{
    navigate("/adminlogin")
  }
},[navigate])

const blockUser=async(id)=>{
  swal({
    title: "Are you sure?",
    text: "Do you want to block this user",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      try {
        const {data}=  axios.put(`http://localhost:5000/user/${id}/block`)
     
          navigate("/admin")
       
    } catch (error) {
        console.log(error);
    }
    } else {
      swal("Continue....");
    }
  });
  
}

const unBlockUser=async(id)=>{
  swal({
    title: "Are you sure?",
    text: "Do you want to unblock this user",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      try {
        const {data}= axios.put(`http://localhost:5000/user/${id}/unblock`)
     
          navigate("/admin")
        
    } catch (error) {
        console.log(error);
    }
    } else {
      swal("Continue....");
    }
  });
 
}

const getUsers= async()=>{
  const {data}=await axios.get("http://localhost:5000/user")
  setUsers(data)
  setFilteredUsers(data)
}
useEffect(()=>{
  getUsers()
},[swal ])


useEffect(()=>{
  const result=users.filter((user)=>{
      return user.firstname.toLowerCase().match(search.toLowerCase());
      
  })
  setFilteredUsers(result)
},[search])
  const coloumn=[
    {name:"NAME",selector:(row)=>row.firstname,style: {
        color: "gray",
        }},
    {name:"EMAIL",selector:(row)=>row.username,style: {
        color: "gray",
        }},
    {name:"ACTION ",selector:(row)=>
    <div style={{display:"flex" }}>

      {row.auth===true ?<button className='button' style={{background:"blue",color:"white",marginLeft:"5px",padding:"10px"}}
        onClick={()=>blockUser(row._id)}
        >Block</button>: <button className='button' style={{background:"red",color:"white",marginLeft:"5px", padding:"10px"}}
        onClick={()=>unBlockUser(row._id)}
        >Unblock</button>}
              
             
         </div>
       
        },
              
]
  

  return (
    <div>
       <DataTable 
        
        columns={coloumn} 
        data={filterUsers} 
        pagination
        fixedHeader
        style={{color:"red"}}
        highlightOnHover
        subHeader
        subHeaderComponent={
            <input type="text" placeholder='SEARCH... ' 
            style={{width:"40%",height:"2rem" ,borderColor:"var(--hrColor)",color:"orangered"}}
            value={search}
            onChange={
                (e)=>
                   setSearch(e.target.value)
                
            }/>
        }
        subHeaderAlign="center"
        // data={data}
      />
    </div>
  )
}

export default Tables
