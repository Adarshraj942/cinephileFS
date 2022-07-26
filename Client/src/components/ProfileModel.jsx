import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../actions/UserAction';
import { uploadImage } from '../api/UploadRequest';

function ProfileModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const {password ,...other}=data
  const [formData,setFormData]=useState(other)
  const [profileImage,setProfileImage]=useState(null)
  const [coverImage,setCoverImage]=useState(null)
  const dispatch =useDispatch()
  const params=useParams()

  const {user} =useSelector((state)=>state.authReducer.authData)

  const handleChange=(e)=>{
         setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onImageChange=(event)=>{
          if(event.target.files && event.target.files[0])
          {
              let img=event.target.files[0]
              event.target.name==="profileImage"?setProfileImage(img):setCoverImage(img)
          }
  }

  const handleSubmit=(e)=>{
      e.preventDefault()
      let UserData=formData

      if(profileImage)
      {
        const data=new FormData()
        const fileName=Date.now()+profileImage.name;
        data.append("name",fileName)
        data.append("file",profileImage)
        UserData.profilePicture=fileName

        try {
          dispatch(uploadImage(data))
        } catch (error) {
          console.log(error);
          
        }
      }

      if(coverImage)
      {
        const data=new FormData()
        const fileName=Date.now()+coverImage.name;
        data.append("name",fileName)
        data.append("file",coverImage)
        UserData.coverPicture=fileName

        try {
          dispatch(uploadImage(data))
        } catch (error) {
          console.log(error);
          
        }
      }
      dispatch(updateUser(params.id,UserData))
      setModalOpened(false)
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
      <form className="infoForm">
     
        <h3>Your info</h3>
       
        <div>
            <input type="text" className="infoInput" name='firstname' value={formData.firstname}  placeholder='First Name' onChange={handleChange} />
            <input type="text" className="infoInput" name='lastname' value={formData.lastname}  placeholder='Last Name' onChange={handleChange} />
        </div>
        
 
        <div>
        <input type="text" className="infoInput" name='worksAt' value={formData.worksAt}  placeholder='Works at ' onChange={handleChange}/>
        </div>

            <div>
            <input type="text" className="infoInput" name='livesin' value={formData.livesin}  placeholder='Lives in' onChange={handleChange} />
            <input type="text" className="infoInput" name='country' value={formData.country}  placeholder='Country' onChange={handleChange} />
        

            </div>

            <div>
                <input type="text" className="infoInput" name='relationship' value={formData.relationship} placeholder='Relationship status' onChange={handleChange}/>
            </div>
         
            <div>
                Profile image
                <input type="file" name='profileImage' onChange={onImageChange} />
                <div>
                Cover image
                <input type="file" name='coverImage' onChange={onImageChange} />
            </div>
            </div>
           
            
              <button className="button info-button" onClick={handleSubmit}> Update</button>
        
      </form>
    </Modal>
  );
}

export default ProfileModal;