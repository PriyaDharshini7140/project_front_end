import axios from "axios";

import { ToastContainer, toast } from 'material-react-toastify';
  import 'material-react-toastify/dist/ReactToastify.css';

  require("dotenv").config()
class AuthService {
 
  login(email_id,password) {
    return axios
    .post(`${process.env.REACT_APP_PORT}/user/login`,{
        email_id:email_id,
      password:password}
      )
      .then(response => {
       

        if (response.data.token) {
          localStorage.setItem("user", response.data.token);
        }
        if(response.data.password !== password)
      {
   if(response.data.message ==="logged in successfully"){
    toast.success(response.data.message,{
      position: "top-center",
      autoClose: 2000,
      
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     
      })
   }
   else{
    toast.error(response.data.message,{
      position: "top-center",
      autoClose: 2000,
      
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
     
      })
   }
    
    }
    else if (response.data.email_id !== email_id) {
      if(response.data.message ==="logged in successfully"){
        toast.success(response.data.message,{
          position: "top-center",
          autoClose: 2000,
          
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         
          })
       }
       else{
        toast.error(response.data.message,{
          position: "top-center",
          autoClose: 2000,
          
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         
          })
       }
        
    } 
    
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user")
  }
  delete(){
    const Token = () => localStorage.getItem("user");
  return axios.delete(`${process.env.REACT_APP_PORT}/user/deleteUser/`, {
   headers:{authorization:`Bearer ${Token()}`}
  }).then(
     (res)=> {
        console.log(res.data);
     }).catch((e)=>console.log(e))
    
  }
  register(user_name, email_id, password) {
    return axios.post(`${process.env.REACT_APP_PORT}/user/addUser`,{
        user_name:user_name,
        email_id:email_id,
        password:password
       }).then((res)=>{alert(res.data.message)
        console.log(res.data.data._id);
     
      }).catch((e)=>console.log(e))
  }

  getCurrentUser() {
    const Token = () => localStorage.getItem("user");
    return axios.post(`${process.env.REACT_APP_PORT}/user/particularUser`,{},{
      headers:{authorization:`Bearer ${Token()}`}
     }).then((res)=>{console.log("res",res.data)
         return res.data}
     ).catch((e)=>console.log("err",e))
  }

  setPassword( email_id) {
    return axios.post(`${process.env.REACT_APP_PORT}/user/forgetPassword`,{
       
        email_id:email_id
       
       }).then((res)=>{
        console.log(res.data);
        alert(res.data.message)
            
      }).catch((e)=>console.log(e))
  }

  UpdatePassword(email_id,password) {
    return axios.post(`${process.env.REACT_APP_PORT}/user/updatePassword`,{
       
        email_id:email_id,
        password:password
       
       }).then((res)=>{
        console.log(res.data);
        alert(res.data.message)
            
      }).catch((e)=>console.log(e))
  }
  setNewPassword(password,token) {
    return axios.post(`${process.env.REACT_APP_PORT}/user/new-password`,{
       
        password:password,
        token:token
       
       }).then((res)=>{
        
        alert(res.data.message)
            
      }).catch((e)=>console.log(e))
  }
}

export default new AuthService();