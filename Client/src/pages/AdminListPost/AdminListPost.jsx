import React, { useEffect, useState } from 'react'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import ShareModal from '../../components/ShareModal/ShareModal';
const AdminListPost = () => {
  const[users,setUsers]=useState([]);
  const [search,setSearch]=useState("");
  const [filterUsers,setFilteredUsers]=useState([]);
  const [modalOpened,setModalOpened]=useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
  const adminInfo=localStorage.getItem('adminInfo')
  if(adminInfo){
    
   navigate("/listpost")
  }else{
    navigate("/adminlogin")
  }
},[navigate])

const deletePost=async(id, userid)=>{
  swal({
    title: "Are you sure?",
    text: "Do you want to delete",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      try {
      console.log(userid);
        const {data}=axios.delete(`http://localhost:5000/post/${id}`,{userId:userid})
        console.log(data)
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
  const {data}=await axios.get("http://localhost:5000/post")
  setUsers(data)
  setFilteredUsers(data)
}
useEffect(()=>{
  getUsers()
},[])

useEffect(()=>{
  const result=users.filter((user)=>{
      return user._id.toLowerCase().match(search.toLowerCase());
      
  })
  setFilteredUsers(result)
},[search])
const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
const coloumn=[
  {name:"ID",selector:(row)=>row._id,style: {
      color: "gray",
      }},
      {name:"IMAGE",selector:(row)=><img src={row.image?serverPublic+row.image:""}  style={{width:"3rem"}} alt='no img'/>,},
  {name:"COMMENTS",selector:(row)=>row.comments.length,style: {
      color: "gray",
      }},
      {name:"LIKES",selector:(row)=>row.likes.length,style: {
        color: "gray",
        }},
        {name:"Description",selector:(row)=>row.desc,style: {
          color: "gray",
          }},
  {name:"ACTION ",selector:(row)=>
   <div style={{display:"flex" }}>
      <>
   
      <button className='button' style={{background:"red",color:"white",padding:"10px",marginLeft:"5px"}}
       onClick={()=>deletePost(row._id, row.userId)}
      >delete</button>
         </>   
        </div>
     
      },
            
]
  return (
    <div className='dashboard'>
    <Sidebar/>
    <div className="HomeContainer">
      <Navbar/>
    
        <div className="listContainer">
          <div className="listTile">Latest posts</div>
           <button className='button'  onClick={()=>setModalOpened(true)} style={{margin:"20px",width:"6rem" ,height:"2rem"}}>Add Post </button>
           <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
          <DataTable 
        
        columns={coloumn} 
        data={filterUsers} 
        pagination
        fixedHeader
        style={{color:"red"}}
        highlightOnHover
        subHeader
        
        subHeaderAlign="center"
        // data={data}
      />
          
        </div>
    </div>
  </div>
  )
}

export default AdminListPost
