import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import Logo from "../../img/logo.png";
import { adminLogin } from "../../api/AdminRequest";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const adminData =localStorage.getItem("adminInfo")
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
 const navigate=useNavigate()
  const [admin, setAdmin] = useState({
    username: "",
    password: ""
  });
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (admin.username === "") {
      setError2(true);
    }else{
      setError2(false)
      try {
        const {data}=await adminLogin(admin)
        console.log(data)
        localStorage.setItem("adminInfo",data)
        navigate("/admin")
      } catch (error) {
         console.log(error);
         setError(true);
      }
    }
   
  }
  useEffect(()=>{
    if(adminData){
      navigate("/admin")
    }
},[navigate])

  const resetForm = () => {
  
    setAdmin({ username: "", email: "", phone: "", password: "" });
  };
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <img src={Logo} alt="" style={{ width: "5rem" }} />
          <div className="WebName">
            <h1>CINEPHILE</h1>
            <h6>Explore the world of movies</h6>
          </div>
        </div>

        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h2 style={{ marginTop: "-2px", color: "var(--hrColor)" }}>
              ADMIN LOGIN
            </h2>
            {error && <span style={{ color: "red" }}> * Login failed(invalid username/password) </span>}
            <input
              type="text"
              placeholder="ENTER ADMIN USERNAME"
              name="username"
              className="input"
              value={admin.username}
              onChange={handleChange}
            />
            {error2 && (
              <span style={{ color: "red" }}>*Username is required</span>
            )}
            <input
              type="password"
              placeholder="ENTER  PASSWORD"
              name="password"
              className="input"
              onChange={handleChange}
              value={admin.password}
            />
           
            <div className="buttons">
              <button type="submit" className="button gold_btn">
                L O G I N
              </button>
            </div>
          </form>
          ,
        </div>
      </div>
      <div className="signInButton"></div>
    </div>
  );
};

export default AdminLogin;
