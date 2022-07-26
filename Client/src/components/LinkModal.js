import React, { useEffect, useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LinkModal = ({modalOpened2,setModalOpened2,data}) => {
  useEffect(()=>{
    setCopy(`http://localhost:3000/post/${data._id}`)
  })
    const theme = useMantineTheme();
    const [copy ,setCopy]=useState("")
    console.log(copy);
  return (
    <Modal
    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.55}
    size={"55%"}
    overlayBlur={3}
    opened={modalOpened2}
    onClose={()=>setModalOpened2(false)}
  >
    <div style={{padding:"0.5rem" ,width:"75%" ,display:"flex",flexDirection:"row"}}>
     <input className='infoInput' style={{width:"95%"}} onChange={(e)=>{
        setCopy(e.target.value)
     }} value={` http://localhost:3000/post/${data._id}`} />
     <button className='button' onClick={()=>{
          navigator.clipboard.writeText(copy)
          toast.success("copied to clipboard");
     }} style={{marginLeft:"1rem"}}>Copy to clipboard</button>
    </div>
    <ToastContainer />
  </Modal>
  )
}

export default LinkModal
