import axios from "axios";
import { useDispatch } from "react-redux";



class AuthService {
 
  login(email_id,password) {
    return axios
    .post('http://localhost:4000/user/login',{
        email_id:email_id,
      password:password}
      )
      .then(response => {
       

        if (response.data.token) {
          localStorage.setItem("user", response.data.token);
        }
        if(response.data.password !== password)
      {
    alert(response.data.message)
    }
    else if (response.data.email_id !== email_id) {
        alert(response.data.message)
        
    } 
    
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user")
  }
  delete(){
    const Token = () => localStorage.getItem("user");
  return axios.delete(`http://localhost:4000/user/deleteUser/`, {
   headers:{authorization:`Bearer ${Token()}`}
  }).then(
     (res)=> {
        console.log(res.data);
     }).catch((e)=>console.log(e))
    
  }
  register(user_name, email_id, password) {
    return axios.post('http://localhost:4000/user/addUser',{
        user_name:user_name,
        email_id:email_id,
        password:password
       }).then((res)=>{alert(res.data.message)
        console.log(res.data.data._id);
        return axios.post('http://localhost:4000/verification/verification',{
          user_id:res.data.data._id,
         }).then((res)=>{
           console.log(res.data)
          
        }).catch((e)=>console.log(e))
        
      }).catch((e)=>console.log(e))
  }

  getCurrentUser() {
    const Token = () => localStorage.getItem("user");
    return axios.post('http://localhost:4000/user/particularUser',{},{
      headers:{authorization:`Bearer ${Token()}`}
     }).then((res)=>{console.log("res",res.data)
         return res.data}
     ).catch((e)=>console.log("err",e))
  }

  setPassword( email_id, password) {
    return axios.post('http://localhost:4000/user/forgetPassword',{
       
        email_id:email_id,
        password:password
       }).then((res)=>{
        console.log(res.data);
            
      }).catch((e)=>console.log(e))
  }
}

export default new AuthService();