import React, { useEffect, useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import axios from 'axios';

const ListRoom = () => {
    const[users,setUsers]=useState([]);
    const [search,setSearch]=useState("");
    const [filterUsers,setFilteredUsers]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
    const adminInfo=localStorage.getItem('adminInfo')
    if(adminInfo){
    
     navigate("/listroom")
    }else{
      navigate("/adminlogin")
    }
  },[navigate])

  const getUsers=async()=>{
    const {data}=await axios.get("http://localhost:5000/room")
    setUsers(data)
    setFilteredUsers(data)
  }

  const deleteRoom =async(id)=>{
    swal({
    title: "Are you sure?",
    text: "Do you want to unblock this user",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
        try {
            const {data}= axios.delete(`http://localhost:5000/room/${id}`)
          
            navigate("/admin")
            
          } catch (error) {
            console.log(error);
          }
    } else {
      swal("Continue....");
    }
  });
     
  }

  useEffect(()=>{
    getUsers()
  },[swal ])
  useEffect(()=>{
    const result=users.filter((user)=>{
        return user.name.toLowerCase().match(search.toLowerCase());
        
    })
    setFilteredUsers(result)
  },[search])
  const coloumn=[
    {name:"ROOM NAME",selector:(row)=>row.name,style: {
        color: "gray",
        }},
    {name:"NUMBER OF MEMBERS",selector:(row)=>row.members.length,  style: {
        color: "gray",
        }},
    {name:"ACTION ",selector:(row)=>
    <div style={{display:"flex" }}>

       <button className='button' style={{background:"red",color:"white",marginLeft:"5px", padding:"10px"}}
        onClick={()=>deleteRoom(row._id)}
        >Delete</button>
              
             
         </div>
       
        },
              
]
  return (
    <div>
         <div className='dashboard'>
      <Sidebar/>
      <div className="HomeContainer">
        <Navbar/>
       
      
          <div className="listContainer">
            <div className="listTile">Latest rooms</div>
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
      </div>
    </div>
    </div>
  )
}

export default ListRoom
