import axios from "axios";

import {  toast } from 'material-react-toastify';
  import 'material-react-toastify/dist/ReactToastify.css';

  require("dotenv").config()
class AuthService {
 
  login(email_id,password) {
    return axios
    .post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/login`,{
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
    
    
  }
  register(user_name, email_id, password) {
    return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/addUser`,{
        user_name:user_name,
        email_id:email_id,
        password:password
       }).then((res)=>{alert(res.data.message)
       
     
      }).catch((e)=>e)
  }

  getCurrentUser() {
    const Token = () => localStorage.getItem("user");
    return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/particularUser`,{},{
      headers:{authorization:`Bearer ${Token()}`}
     }).then((res)=>{
         return res.data}
     ).catch((e)=>e)
  }

  setPassword( email_id) {
    return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/forgetPassword`,{
       
        email_id:email_id
       
       }).then((res)=>{
        
        alert(res.data.message)
            
      }).catch((e)=>e)
  }


  setNewPassword(password,token) {
    return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/new-password`,{
       
        password:password,
        token:token
       
       }).then((res)=>{
        
        alert(res.data.message)
            
      }).catch((e)=>e)
  }
}

export default new AuthService();