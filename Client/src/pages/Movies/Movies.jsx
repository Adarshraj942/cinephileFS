
import { Container } from '@mantine/core'
import React from 'react'

import Header from "../../components/Header/Header"
import SimpleBottomNavigation from '../../components/MainNav'

import "./Movies.css"

const Movies = () => {
  return (
   
 
   <div className='Movies'>
   <Header/> 
    <div className='Movie'>
        <Container>
       
          this is trending

           
        </Container>
          <SimpleBottomNavigation/>
    </div>
  
   </div>
 
  
  )
}

export default Movies
