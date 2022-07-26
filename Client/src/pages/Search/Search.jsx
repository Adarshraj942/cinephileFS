import { Button, Container } from '@mantine/core'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import SimpleBottomNavigation from '../../components/MainNav'
import "./Search.css"
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { useEffect } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
const Search = () => {
  const [page,setPage]=useState(1)
  const [type,setType]=useState(0)
  const [searchText, setSearchText]=useState("")
  const [content,setContent]=useState([])
  const [noOfPages,setNumOfPages]=useState()
   console.log(type)
  const fetchSearch=async()=>{
    
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_MOVIE_DATABASE_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
       console.log(data);
    
  }
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
  
  return (
    <div className='Movies'>
    <Header/> 
     <div className='Movie'>
         <Container>
        
           <div style={{display:"flex" ,margin:"15px 0 "}}>
           <TextField
           style={{flex:1 ,}}
           className="searchBox"
           label="Search"
           variant='filled'
           onChange={(e)=>setSearchText(e.target.value)}
           />
           <Button variant='contained'
            style={{marginLeft:10,marginTop:"auto",marginBottom:"auto"}}
            onClick={fetchSearch}><SearchIcon/></Button>
           </div>
           <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
            <Tab style={{width:"50%"}} label="SEARCH MOVIES"/>
            <Tab style={{width:"50%"}} label="SEARCH TV SERIES"/>
           </Tabs>

           <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={ type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
           content.length===0 &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {noOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={noOfPages} />
      )}
          
            
         </Container>
           <SimpleBottomNavigation/>
     </div>
   
    </div>
  )
}

export default Search
