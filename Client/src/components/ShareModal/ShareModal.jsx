import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from '../postShare/PostShare';
import {UilScenery} from "@iconscout/react-unicons"
import {UilPlayCircle} from "@iconscout/react-unicons"
import {UilLocationPoint} from "@iconscout/react-unicons"
import {UilSchedule} from "@iconscout/react-unicons"
import {UilTimes} from "@iconscout/react-unicons"
import React ,{useState,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/uploadAction'
import { useNavigate } from 'react-router-dom';

function ShareModal({modalOpened,setModalOpened}) {
  const navigate=useNavigate()
  const theme = useMantineTheme();
  const admin =localStorage.getItem("adminInfo")
  const loading =useSelector((state)=>state.postReducer.uplading)
  const dispatch=useDispatch()
  const [image,setImage]=useState(null)
  const desc=useRef()
  const imageRef=useRef()
  const onImageChange=(event)=>{
      if(event.target.files && event.target.files[0]){
          let img=event.target.files[0];
          setImage(img)
      }
  }


  const handleSubmit=(e)=>{
    e.preventDefault();

    const newPost={
        userId:"Admin",
        desc:desc.current.value
    }

    if(image){
        const data=new FormData()
        const filename =Date.now() + image.name
        data.append("name",filename)
        data.append("file",image)
        newPost.image=filename
        console.log(newPost)
        try {
            dispatch(uploadImage(data))
        } catch (error) {
            console.log(error)
        }
    }
    dispatch(uploadPost(newPost))
    resetShare();
}

const resetShare=()=>{
    setImage(null)
    setModalOpened(false)
    desc.current.value=null;
    navigate("/admin")
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
      {admin ?<>
        <div className="PostShare">
            
             <div>
                 <input type="text" placeholder="What's happening " ref={desc} required />
                 <div className="postOptions">
                     <div className="options" style={{color:"var(--photo)"}} onClick={()=>imageRef.current.click()}>
                         <UilScenery/>
                         Photo
                     </div>
                     <div className="options" style={{color:"var(--video)"}}>
                         <UilPlayCircle/>
                         Video
                     </div>
                     <div className="options" style={{color:"var(--location)"}}>
                         <UilLocationPoint/>
                         Location
                     </div>
                     <div className="options" style={{color:"var(--shedule)"}}>
                         <UilSchedule/>
                         Schedule
                     </div>
                     <button className='button ps-button'onClick={handleSubmit} disabled={loading}>
                         {loading?"Uploading...":"Share"}
                     </button>
                     <div style={{display:"none"}}>
                         <input type="file" name='myImage' ref={imageRef} onChange={onImageChange}/>
                     </div>

                   </div>
                   {image && 
                     <div className="previewImage">
                         <UilTimes onClick={()=>setImage(null)}/>
                         <img src={URL.createObjectURL(image)} alt="" />

                     </div>
                   }
                 </div> 
               
             
      </div>
    
      
      
      
      </>:<PostShare/>}
     
    </Modal>
  );
}

export default ShareModal;