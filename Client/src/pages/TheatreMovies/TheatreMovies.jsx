import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
import TheatreMoviesModal from '../../components/TheatreMoviesModal'
import DataTable from 'react-data-table-component';
import swal from "sweetalert";
import axios from 'axios';
const TheatreMovies = () => {
  const theatre=localStorage.getItem("theatreInfo")
   
  useEffect(()=>{
       if(theatre){
        navigate("/theatremovies")
       }else{
        navigate("/theatreauth")
       }
  },[])
  const theater=JSON.parse(theatre)
  console.log(theater?.theatre?._id)
  const[users,setUsers]=useState([]);
  const [search,setSearch]=useState("");
  const [filterUsers,setFilteredUsers]=useState([]);
  const navigate = useNavigate();
  
  const getUsers=async()=>{
    const {data}=await axios.get(`http://localhost:5000/movie/${theater?.theatre?._id}`)
    setUsers(data)
    console.log(data);
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
            const {data}= axios.delete(`http://localhost:5000/movie/${id}`)
          
            navigate("/theatre")
            
          } catch (error) {
            console.log(error);
          }
    } else {
      swal("Continue....");
    }
  });
     
  }
  useEffect(()=>{
    const result=users.filter((user)=>{
        return user.moviename.toLowerCase().match(search.toLowerCase());
        
    })
    setFilteredUsers(result)
  },[search])
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const coloumn=[
    {name:"POSTER",selector:(row)=> <img src={row.image?serverPublic+row.image:""}  style={{width:"3rem"}} alt='no img'/> },
    {name:"MOVIE NAME",selector:(row)=>row.moviename,style: {
        color: "gray",
        }},
    {name:"SHOWS",selector:(row)=>row.showtimes},
    {name:"DESCRIPTION",selector:(row)=>row.desc},
    {name:"DESCRIPTION",selector:(row)=>row.ticketcharge},
    {name:"RELEASE",selector:(row)=>row.releasedate},
    {name:"OUT",selector:(row)=>row.outdate},
    {name:"ACTION ",selector:(row)=>
    <div style={{display:"flex" }}>

       <button className='button' style={{background:"red",color:"white",marginLeft:"5px", padding:"10px"}}
        onClick={()=>deleteRoom(row._id)}
        >Delete</button>
         <button className='button' style={{background:"blue",color:"white",marginLeft:"5px", padding:"10px"}}
        onClick={()=>deleteRoom(row._id)}
        >Edit</button>
              
             
         </div>
       
        },
              
]

  useEffect(()=>{
    getUsers()
  },[swal ])
    const [modalOpened2,setModalOpened2]=useState(false);
  
  return (
    <div className='dashboard'>
    <Sidebar data={true}/>
    <div className="HomeContainer">
      <Navbar/>
      <div className="listContainer">
            <div className="listTile">THEATRE MOVIES</div>
              <button onClick={()=>setModalOpened2(true)}
               className='button' style={{width:"5rem",height:"2rem",marginTop:"20px"}}
               >Add movies</button>
               <TheatreMoviesModal modalOpened2={modalOpened2} setModalOpened2={setModalOpened2}/>
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
  )
}

export default TheatreMovies
