import React from "react";
import "./SideBar.scss";
import swal from "sweetalert";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
const Sidebar = ({data}) => {
  const navigate = useNavigate();
  return (
    <div className="sideBar">
      <div className="Top">
        <span className="Logo">{!data ?"Cinephile Admin":"CinePhile Theatres"}</span>
      </div>
      <hr />
      <div className="Center">
       
         {!data ?
          <ul>
           <p className="Tit">Main</p>
           <li onClick={() => navigate("/admin")}>
             <DashboardIcon className="icon" />
             <span>Dashboard</span>
           </li>
           <p className="Tit">List</p>
           <li onClick={() => navigate("/listuser")}>
             <PeopleIcon className="icon" />
             <span>Users</span>
           </li>
           <li onClick={()=>navigate("/listroom")}>
             <ChatBubbleIcon className="icon" />
             <span>Rooms</span>
           </li>
           <li onClick={() => navigate("/listpost")}>
             {" "}
             <PostAddIcon className="icon" />
             <span>Post</span>
           </li>
           <li>
             {" "}
             <MovieCreationIcon className="icon" />
             <span>Theatre</span>
           </li>
           <li>
             <PeopleIcon className="icon" />
             <span>Owners</span>
           </li>
           <p className="Tit">Usefull Links</p>
           <li>
             <SettingsSystemDaydreamIcon className="icon" />
             <span>System</span>
           </li>
           <li>
             <VpnKeyIcon className="icon" />
             <span>Logs</span>
           </li>
           <p className="Tit">Admin</p>
           <li>
             <SettingsIcon className="icon" />
             <span>Settings</span>
           </li>
           <li>
             <AccountCircleIcon className="icon" />
             <span>Profile</span>
           </li>
     
          <li
            onClick={() => {
              swal({
                title: "Are you sure?",
                text: "Do you want to logout",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  localStorage.removeItem("adminInfo");
                  navigate("/adminlogin");
                } else {
                  swal("Continue....");
                }
              });
            }}
          >
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>:
         <ul>
         <p className="Tit">Main</p>
         <li onClick={() => navigate("/theatre")}>
           <DashboardIcon className="icon" />
           <span>Dashboard</span>
         </li>
         <p className="Tit">List</p>
         <li onClick={() => navigate("/listuser")}>
           <PeopleIcon className="icon" />
           <span>Earnings</span>
         </li>
         <li onClick={()=>navigate("/listroom")}>
           <ChatBubbleIcon className="icon" />
           <span>Bookings</span>
         </li>
         <li onClick={() => navigate("/theatremovies")}>
           {" "}
           <PostAddIcon className="icon" />
           <span>Movies</span>
         </li>
         <li  onClick={() => navigate("/theatreprofile")}>
           {" "}
           <MovieCreationIcon className="icon" />
           <span>Theatre</span>
         </li>
         <li>
           <PeopleIcon className="icon" />
           <span>Owners</span>
         </li>
         <p className="Tit">Usefull Links</p>
         <li>
           <SettingsSystemDaydreamIcon className="icon" />
           <span>System</span>
         </li>
         <li>
           <VpnKeyIcon className="icon" />
           <span>Logs</span>
         </li>
         <p className="Tit">Admin</p>
         <li>
           <SettingsIcon className="icon" />
           <span>Settings</span>
         </li>
         <li>
           <AccountCircleIcon className="icon" />
           <span>Profile</span>
         </li>
   
        <li
          onClick={() => {
            swal({
              title: "Are you sure?",
              text: "Do you want to logout",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                localStorage.removeItem("theatreInfo");
                navigate("/theatreauth");
              } else {
                swal("Continue....");
              }
            });
          }}
        >
          <ExitToAppIcon className="icon" />
          <span>Logout</span>
        </li>
      </ul>
            }
      </div>
      <div className="Bottom">
        <div className="colorOptions"></div>
        <div className="colorOptions"></div>
      </div>
    </div>
  );
};

export default Sidebar;
