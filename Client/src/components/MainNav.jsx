import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import HomeIcon from '@mui/icons-material/Home';
import AllOutIcon from '@mui/icons-material/AllOut';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useNavigate } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState();
  const navigate=useNavigate()

  return (
    <Box sx={{ width: "100%" ,position:"fixed", bottom:0, zIndex:100,backgroundColor:"bla"}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {

          
          if(newValue===0){
            navigate("/trending")
            setValue(0)
        }
        else if(newValue===1){
            navigate("/movies")
           
        }
        else if(newValue===2){
            navigate("/series")
          
        }
        else if(newValue===3){
            navigate("/search")
            
        }
        else if(newValue===4){
            navigate("../post")
            
        }else if(newValue===5){
          navigate("../tickets")
        }
        else if(newValue===6){
          navigate("../home")
          
      }
        }}
      >
         
        <BottomNavigationAction label="Trending" icon={<WhatshotIcon/>} />
        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction label="TV series" icon={<TvIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Posts" icon={<AllOutIcon />} />
        <BottomNavigationAction label="Tickets" icon={<ConfirmationNumberIcon />} />
        <BottomNavigationAction label="home" icon={<HomeIcon />} />

      </BottomNavigation>
    </Box>
  );
}
