import axios from "axios";



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

  register(user_name, email_id, password) {
    return axios.post('http://localhost:4000/user/addUser',{
        user_name:user_name,
        email_id:email_id,
        password:password
       }).then((res)=>alert(res.data.message)).catch((e)=>console.log(e))
  }

  getCurrentUser() {
    const Token =()=> localStorage.getItem("user");
    return axios.post('http://localhost:4000/user/addUser',{
      headers:{Authorization:`Bearer${Token}`}
     }).then((res)=>console.log(res.data)).catch((e)=>console.log(e))
  }
}

export default new AuthService();