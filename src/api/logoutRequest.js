import axios from "axios";

const API = axios.create({ baseURL: "https://skillop-back.onrender.com" });


export const logoutUser = () =>{
  
 return   API.get(`/api/user/logout`, { withCredentials: true })}
