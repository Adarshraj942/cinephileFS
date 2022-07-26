import axios from "axios"

const API =axios.create({baseURL:"http://localhost:5000"})

export const logIn=(formdata)=>API.post("/auth/login",formdata)
export const signUp=(formdata)=>API.post("/auth/register",formdata)