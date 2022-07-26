import axios from "axios"

const API =axios.create({baseURL:"http://localhost:5000"})

export const getRooms =()=>API.get("/room")

export const joinRoom=(roomId,userId)=>API.post(`/room/${roomId}`, {userId})

export const getRoomChats=(userId)=>API.get(`/room/${userId}`)

export const deleteRoom=(id)=>API.delete(`/room/${id}`)