import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chart from '../../components/Charts/Chart'
import Feature from '../../components/Feature/Feature'
import Navbar from '../../components/NavBar/Navbar'
import Sidebar from '../../components/SideBar/Sidebar'
import Table from '../../components/table/Table'
import Widgets from '../../components/Widgets/Widgets'
import "./dashboard.scss"
const Dashboard = () => {
  const admin=localStorage.getItem("adminInfo")
  const navigate=useNavigate()
  useEffect(()=>{
       if(admin){
        navigate("/admin")
       }else{
        navigate("/adminlogin")
       }
  },[])
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="HomeContainer">
        <Navbar/>
        <div className="widgets">
          <Widgets type="user"/>
          <Widgets type="post"/>
          <Widgets type="earnings"/>
          <Widgets type="balance"/>
        </div>
        <div className="charts">
            <Feature/>
            <Chart/>
          </div>
          <div className="listContainer">
            <div className="listTile">Latest users</div>
            <Table/>
          </div>
      </div>
    </div>
  )
}

export default Dashboard

