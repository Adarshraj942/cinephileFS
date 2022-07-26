import React, { useEffect } from 'react'
// import "./Auth.css"
import Logo from "../../img/logo.png"
import { useState } from 'react'    
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theatreLogIn, theatreSignUp } from '../../api/TheatreAuth';
import { useNavigate } from 'react-router-dom';
const TheatreAuth = () => {
  const navigate=useNavigate()
  const theatre=localStorage.getItem("theatreInfo")
  useEffect(()=>{
    if(theatre){
      navigate("/theatre")
    }
},[navigate])
   const [isSignUp,setIsSignUp]=useState(false)
   const [data1,setData]=useState({theatrename:"",theatreAdmin:"",city:"",password:"",confirmpass:""})

   const handleChange=(e)=>{
      setData({...data1,[e.target.name ]:e.target.value})
   }

   const [confirmPass,setConfirmPass]=useState(true);
   const handleSubmit=async(e)=>{
       e.preventDefault();
       if(isSignUp){
           if (data1.theatreAdmin === "" || data1.theatrename=== "" || data1.city === "" ||data1.password==="",data1.confirmpass==="") {
               toast.error("Fields can't be empty");
             } else if (data1.password !== data1.confirmpass) {
               toast.error("Password dosen't match");
             } 
           else{
            if(data1.password ===data1.confirmpass){
              const {data}=await theatreSignUp(data1)
              localStorage.setItem("theatreInfo",JSON.stringify(data))
              setConfirmPass(false)
              navigate("/theatre")
            }
               
           }
       }else{
           if (data1.theatreAdmin === "") {
               toast.error("Enter Adminname")
             }else{
             const {data}  = await theatreLogIn(data1)
             localStorage.setItem("theatreInfo",JSON.stringify(data))
             navigate("/theatre")
             if(data){
               toast.info("Login failed")
              
             }
             }
              
       }
   }

   const resetForm=()=>{
       setConfirmPass(true)
       setData({theatreAdmin:"",theatrename:"",city:"",password:"",confirmpass:""})
   }   
  return (
    <div className='Auth'>
    {/* left side */}
  <div className="a-left">
      <img src={Logo} alt="" style={{width:"5rem"}} />
      <div className="WebName">
        
          <h1>CINEPHILE</h1>
          <h6>Theatre admins...</h6>
      </div>
  </div>
  {/* right side */}
  <div className="a-right">
        <form  className="infoForm" onSubmit={handleSubmit}>


            <h3>{isSignUp ? "Sign up":"Login"}</h3>

            {isSignUp &&
               <div>
               <input type="text" placeholder='Theater name' value={data1.theatrename} className='infoInput' name='theatrename'onChange={handleChange}/>
               <input type="text" placeholder='city' value={data1.city} className='infoInput' name='city' onChange={handleChange} />
               </div>
            }
           
            <div>
                <input type="text" placeholder='Admin name' value={data1.theatreAdmin} className="infoInput" name='theatreAdmin' onChange={handleChange}/>
            </div>
            <div>
                <input type="password" className="infoInput" value={data1.password} placeholder='Password' name='password'onChange={handleChange}/>
               
               {isSignUp &&  <input type="password" value={data1.confirmpass} className="infoInput"  placeholder='Confirm Password' name='confirmpass' onChange={handleChange}/>}
               
            </div>
            <span style={{display:confirmPass?"none":"block",color:"red",fontSize:"12px",alignSelf:"flex-end",marginRight:"5px"}}>
                *confirm password is not same
            </span>
            <div>
                <span style={{fontSize:"12px",cursor:"pointer"}} onClick={()=>{
                    setIsSignUp(prev=>!prev);resetForm()
                }}> {isSignUp?"Already have an account. Login!":"Don't have an account.Signup!"}</span>
            </div>
              <button className="button info-button" type='submit'  >{isSignUp?"Sign up":"Login"} </button>

        </form>
    </div>
    <ToastContainer />
</div>
  )
}

export default TheatreAuth
