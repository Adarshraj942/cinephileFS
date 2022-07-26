import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import {Routes,Route,Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
import Movies from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import MovieList from "./pages/MovieList/MovieList";
import Search from "./pages/Search/Search";
import Series from "./pages/Series/Series";
import Chat from "./pages/Chat/Chat";
import Post from "./pages/Posts/Post";
import OuterPost from "./pages/OuterPost/OuterPost";
import Room from "./pages/Room/Room";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import List from "./pages/List/List"
import AdminListPost from "./pages/AdminListPost/AdminListPost";
import ListRoom from "./pages/ListRooms/ListRoom";
import ErroePage from "./pages/ErrorPage/ErroePage";
import TheatreAuth from "./pages/TheatreAuth/TheatreAuth";
import TheatreDashboard from "./pages/TheatreDashboard/TheatreDashboard";
import TheatreMovies from "./pages/TheatreMovies/TheatreMovies";
import TheatreProfile from "./pages/TheatreProfile/TheatreProfile";
import Tickets from "./pages/Tickets/Tickets";


function App() {
  const user=useSelector((state)=>state.authReducer.authData)
  const admin=sessionStorage.getItem("adminInfo")
  return (
    <div className="App">
      {/* <div className="blur" style={{top:"-18%" ,right:"0"}}></div>
      <div className="blur" style={{top:"36%" ,left:"-8rem"}}></div> */}
     <Routes>
      <Route path="/" element={user?<Navigate to="home"/>:<Navigate to="auth" />}/>
      <Route path="/home" element={user?<Home/>:<Navigate to="../auth"/>}/>
      <Route path="auth" element={user?<Navigate to="../home"/>:<Auth/>}/>
      <Route path="/profile/:id" element={user?<Profile/>:<Navigate to="../auth"/>}/>
      <Route path="/explore" element={<Movies/>}/>
      <Route path="/trending" element={<Trending/>}/>
      <Route path="/movies" element={<MovieList/>}/>
      <Route path="/series" element={<Series/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/tickets" element={<Tickets/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/post/:id/" element={<OuterPost/>}/>
      <Route path="/chat/" element={user?<Chat/>:<Navigate to="../auth"/>}/>
      <Route path="/room/" element={user?<Room/>:<Navigate to="../auth"/>}/>
      <Route path="/admin" element={<Dashboard/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/listuser"   element={<List/>}/>
      <Route path="/listpost"   element={<AdminListPost/>}/>
      <Route path="/listroom"   element={<ListRoom/>}/>
      <Route path="/theatreauth"   element={<TheatreAuth/>}/>
      <Route path="/theatre"   element={<TheatreDashboard/>}/>
      <Route path="/theatremovies"   element={<TheatreMovies/>}/>
      <Route path="/theatreprofile"   element={<TheatreProfile/>}/>
      <Route path="*"   element={<ErroePage/>}/>


      {/* <Route path="/list" element={<List/> }/>
      <Route path="/new" element={<New/> }/>
      <Route path="/single" element={<Single/> }/>  */}

      {/* <Route path="/admin" >
       <Route index element={/>
       <Route path="login" element={}/>
       <Route path="users">
        <Route index element={<List/>}/>
        <Route path=":userId" element={<Single/>}/>
        <Route path="new" element={<New/>}/>
       </Route> */}
      {/* </Route> */}
     </Routes>
    </div>
  );
}

export default App;
