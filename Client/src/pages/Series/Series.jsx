import { Container } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres'
import Header from '../../components/Header/Header'
import SimpleBottomNavigation from '../../components/MainNav'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent/SingleContent'
import useGenres from '../../hooks/useGenres'
import "./Series.css"
const Series = () => {

  const [page,setPage]=useState(1)
  const [content,setContent]=useState([])
  const [noOfPages,setNumOfPages]= useState()
  const [selectedGenres,setSelectedGenres]=useState([])
  const [genres,setGenres]=useState([])
  const genreforURL=useGenres(selectedGenres)
  const fetchMovies=async()=>{
    const {data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DATABASE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
     setContent(data.results)
    
     setNumOfPages(data.total_pages)
  }
  useEffect(()=>{
   fetchMovies()
  },[page,genreforURL])
  return (
    <div className='Movies'>
    <Header/> 
     <div className='Movie'>
         <Container>
        
         <span className='pageTitle'>Movies</span>

<Genres type="tv"
 selectedGenres={selectedGenres}
  genres={genres}
  setGenres={setGenres}
  setSelectedGenres={setSelectedGenres}
  setPage={setPage} />
 <div className="trending">
   {
     content && content.map((c)=>
       <SingleContent
        key={c.id} 
       id={c.id}
        poster={c.poster_path} 
       title={c.title }
        date={c.first_air_date }
         media_type="tv" 
         vote_average={c.vote_average}/>
     )
   }
 </div>
     {noOfPages>1 &&
  <CustomPagination setPage={ setPage } noOfPages={noOfPages}/>
     }

 
            
         </Container>
           <SimpleBottomNavigation/>
     </div>
   
    </div>
  )
}

export default Series
