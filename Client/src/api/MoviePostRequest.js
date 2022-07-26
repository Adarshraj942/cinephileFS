import axios from "axios"

const API =axios.create({baseURL:"http://localhost:5000"})

export const moviePost =(data)=>API.post("/movie",data)
