import axios from "axios"

const API =axios.create({baseURL:"http://localhost:5000"})

export const getTimelinePosts=(id)=>API.get(`/post/${id}/timeline`)

export const likePost=(id,userId)=>API.put(`post/${id}/like`,{userId:userId})

export const addComment=(data)=>API.post('/post/comments',data)

export const getPosts=()=>API.get("/post")

export const getPost=(id)=>API.get(`/post/${id}`)

export const deletePost=(postId)=>API.delete(`/post/${postId}`)