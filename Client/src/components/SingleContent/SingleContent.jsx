import React from 'react'
import "./SingleContent.css"
import {img_300, unavailable} from "../../config/config"
import { Badge } from '@mantine/core'
import ContentModal from '../ContentModal/ContentModal'
const SingleContent = ({
    id,
    title,
    poster,
    media_type,
    date,
    vote_average
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      
    
  

     <img className='poster' src={poster?`${img_300}/${poster}`:unavailable} alt={title} />
     <Badge   color={vote_average>6?"primary":"secondary"}>Rating:{vote_average}</Badge>
     <b className="title">{title}</b>
     
     <span className='subTitle'>{media_type==="tv"?"Tv series":"Movie"}
     <span className='subTitle'>{date}</span>
    
     </span>
   </ContentModal>
  )
}

export default SingleContent
