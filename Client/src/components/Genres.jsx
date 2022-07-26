import { Chip } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Genres = ({
    selectedGenres,
    genres,
    setGenres,
    setSelectedGenres,
    type,
    setPage
}) => {

    const fetchGenres=async()=>{
      const {data} =await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_DATABASE_KEY}&language=en-US`)
      setGenres(data.genres)
    }
     console.log(genres);
    useEffect(()=>{
       fetchGenres()
       return ()=>{
        setGenres({})
       }
    },[])

    const handleAdd=(genre)=>{
         setSelectedGenres([...selectedGenres,genre])
         setGenres(genres.filter((g)=>g.id!==genre.id))
         setPage(1)
    }

    const handleRemove=(genre)=>{
          setSelectedGenres(selectedGenres.filter((selected)=>selected.id!==genre.id))
          setGenres([...genres,genre])
        setPage(1)
    }
  return (
    <div style={{padding:"6px 0"}}>

{selectedGenres && selectedGenres.map((genre)=>
        <Chip 
        label={genre.name}
        style={{margin:2}} clickable
        size="small" key={genre.id}
        color="primary"
        onDelete={()=>handleRemove(genre)}/>
      )}
      {genres && genres.map((genre)=>
        <Chip 
        label={genre.name}
        style={{margin:2}} clickable
        size="small" key={genre.id}
        onClick={()=>handleAdd(genre)}/>
      )}
    </div>
  )
}

export default Genres
