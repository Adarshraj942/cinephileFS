import React from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Auth = () => {
    const dispatch=useDispatch()
     const loading=useSelector((state)=>state.authReducer.loading)
    const [isSignUp,setIsSignUp]=useState(false)
    const [data,setData]=useState({firstname:"",lastname:"",username:"",password:"",confirmpass:""})
     console.log(loading);
    const handleChange=(e)=>{
       setData({...data,[e.target.name ]:e.target.value})
    }

    const [confirmPass,setConfirmPass]=useState(true);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignUp){
            if (data.firstname === "" || data.lastname === "" || data.username === "" ||data.password==="",data.confirmpass==="") {
                toast.error("Fields can't be empty");
              }else if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.username)
              ) {
                toast.error("Enter valid email id");
              } else if (data.password !== data.confirmpass) {
                toast.error("Password dosen't match");
              } 
            else{
                data.password ===data.confirmpass?dispatch(signUp(data)):setConfirmPass(false)
            }
        }else{
            if (data.username === "") {
                toast.error("Enter username")
              }else{
              const beta  =  dispatch(logIn(data))
              
              if(beta){
                toast.info("Login failed")
              }
              }
               
        }
    }

    const resetForm=()=>{
        setConfirmPass(true)
        setData({firstname:"",lastname:"",username:"",password:"",confirmpass:""})
    }
     
  return (
    <div className='Auth'>
        {/* left side */}
      <div className="a-left">
          <img src={Logo} alt="" style={{width:"5rem"}} />
          <div className="WebName">
              <h1>CINEPHILE</h1>
              <h6>Explore the world of movies</h6>
          </div>
      </div>
      {/* right side */}
      <div className="a-right">
            <form  className="infoForm" onSubmit={handleSubmit}>


                <h3>{isSignUp ? "Sign up":"Login"}</h3>

                {isSignUp &&
                   <div>
                   <input type="text" placeholder='First name' value={data.firstname} className='infoInput' name='firstname'onChange={handleChange}/>
                   <input type="text" placeholder='Last name' value={data.lastname} className='infoInput' name='lastname' onChange={handleChange} />
                   </div>
                }
               
                <div>
                    <input type="text" placeholder='User Name' value={data.username} className="infoInput" name='username' onChange={handleChange}/>
                </div>
                <div>
                    <input type="password" className="infoInput" value={data.password} placeholder='Password' name='password'onChange={handleChange}/>
                   
                   {isSignUp &&  <input type="password" value={data.confirmpass} className="infoInput"  placeholder='Confirm Password' name='confirmpass' onChange={handleChange}/>}
                   
                </div>
                <span style={{display:confirmPass?"none":"block",color:"red",fontSize:"12px",alignSelf:"flex-end",marginRight:"5px"}}>
                    *confirm password is not same
                </span>
                <div>
                    <span style={{fontSize:"12px",cursor:"pointer"}} onClick={()=>{
                        setIsSignUp(prev=>!prev);resetForm()
                    }}> {isSignUp?"Already have an account. Login!":"Don't have an account.Signup!"}</span>
                </div>
                  <button className="button info-button" type='submit' disabled={loading} >{loading?"loading...!":isSignUp?"Sign up":"Login"} </button>

            </form>
        </div>
        <ToastContainer />
    </div>
  )

}



export default Auth 
