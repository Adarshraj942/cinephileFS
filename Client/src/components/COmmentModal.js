import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addComment } from '../api/PostRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const COmmentModal = ({modalOpened,setModalOpened,data}) => {
    const theme = useMantineTheme();
    const {user} =useSelector((state)=>state.authReducer.authData)
    const [comment,setComment]=useState("")
    const [sComment,setSComment]=useState([])
    const [arr,setArr]=useState(false)
    console.log(sComment);
   

    const CommentData={
        postId:data._id,
        commentText:comment,
        postedBy:user._id
    }
      const handleClick=async(e)=>{
        e.preventDefault()
       if(comment!==""){
        const {data}=await addComment(CommentData)
        console.log(data);
        if(data){
           setSComment(data)
           setArr(true)
           toast.success("Commented on this post")
          resetForm()
    }
       }
         
        
      }
     
    const resetForm=()=>{
        setComment("")
    }
  return (
   
        <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      size={"55%"}
      overlayBlur={3}
      opened={modalOpened}
      onClose={()=>setModalOpened(false)}
    >

    <form onSubmit={handleClick}>

        <input type="text" style={{width:"70%"}} value={comment} className='infoInput' onChange={(e)=>setComment(e.target.value)} placeholder="ADD YOUR COMMENT..."/>
        
        <button className=' button '  style={{ width:"18%",height:"2rem",marginTop:"1rem",marginLeft:"25rem"}}>Comment</button>
    </form>

      {arr && sComment.map((cmm)=>{
          return <div style={{padding:"10px" ,backgroundColor:"var(--cardCOlor)"}}>
             <div style={{padding:"10px" ,backgroundColor:"rgb(241, 237, 237)", color:"" ,borderRadius:"10px"}}>
            <div>
             <h3 style={{color:"#885eeb"}}><b>{cmm.commentedUserData.firstname}</b>  </h3> 
            </div>
            
             <span style={{marginLeft:"30px"}}>"{cmm.text}...!"</span>
           
          </div>
          </div>
      }
        
      ) }
     <ToastContainer />
    </Modal>
    
  )
}

export default COmmentModal
