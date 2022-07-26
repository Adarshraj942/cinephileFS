import axios from "axios"

const API =axios.create({baseURL:"http://localhost:5000"})

export const theatreLogIn=(formdata)=>API.post("/theaterauth/login",formdata)
export const theatreSignUp=(formdata)=>API.post("/theaterauth/register",formdata)
export const getTheatreDetails=(id)=>API.get(`/theaterauth/${id}`)
export const updateTheater=(id,data)=>API.put(`/theaterauth/${id}`, data)