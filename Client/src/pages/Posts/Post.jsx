import { Container } from '@mantine/core'
import React, { useState } from 'react'
import "./Post.css"
import Header from "../../components/Header/Header"
import SimpleBottomNavigation from '../../components/MainNav'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SinglePost from '../../components/singlePost/SinglePost'
import { useEffect } from 'react'
import { getPosts } from '../../api/PostRequest'

const Post = () => {
 
  const [posts,setPost]=useState([])
  useEffect(async()=>{
     const {data}=await getPosts()
     setPost(data)
  },[])
  return (
    <div className='Movies'>
    <Header/> 
     <div className='Movie'>
         <Container>
         
         <span className='pageTitle'>Posts_ {posts.length===0 && <span>not found...!</span> }</span>

         
          <div className="trending">
            {posts && posts.map((post,id)=>{
              return  (
                
                <div className="media">
                 
                 <SinglePost data={post} id={id}/>
                
                </div>

                  
                
              )
             
            })
              
              
              
            }
          </div>
              
           <CustomPagination />
              
 
            
         </Container>
           <SimpleBottomNavigation/>
     </div>
   
    </div>
  )
}

export default Post
