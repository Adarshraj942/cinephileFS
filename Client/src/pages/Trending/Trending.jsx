import { Container } from '@mantine/core'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import SimpleBottomNavigation from '../../components/MainNav'
import axios from 'axios'
import { useEffect } from 'react'
import SingleContent from '../../components/SingleContent/SingleContent'
import "./Trending.css"
import CustomPagination from '../../components/Pagination/CustomPagination'

const Trending = () => {
    const [movie,setMovie] = useState()
    const [page,setPage]=useState(1)
    useEffect(()=>{
       axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_DATABASE_KEY}&page=${page}`).then((response)=>{
        console.log(response.data.results)
         setMovie(response.data.results)
       })
    },[page ])
  return (
   
         <div className='Movies'>
   <Header/> 
   
    <div className='Movie'>
        <Container>
         <span className='pageTitle'>Trending</span>
          <div className="trending">
            {
              movie && movie.map((c)=>
                <SingleContent
                 key={c.id} 
                id={c.id}
                 poster={c.poster_path} 
                title={c.title || c.name}
                 date={c.first_air_date || c.release_date}
                  media_type={c.media_type} 
                  vote_average={c.vote_average}/>
              )
            }
          </div>

           <CustomPagination setPage={setPage} noOfPages={10}/>
        </Container>
          <SimpleBottomNavigation/>
    </div>
  
   </div>
  
  )
}

export default Trending
