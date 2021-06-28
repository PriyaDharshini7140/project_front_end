
import AuthService from '../auth/AuthService'
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  AUTH
} from './Types'


import { mvpDisplay, newFeeds, newFeedsLike} from './postActions';
import {reqVerification} from './verficationAction';
import axios from 'axios';

require("dotenv").config()



export const fetchUsers = (email,password) => {
  
   
  return (dispatch) => {
   
    dispatch(fetchUsersRequest())
      AuthService.login(email,password)
      .then(response => {
        const users = response
        // console.log(users.role);
        if(users.message === "logged in successfully"&& localStorage.getItem('user') !== null)
                    {
                      
                      AuthService.getCurrentUser().then(res => {
                        dispatch(fetchUsersSuccess(res))
                        if(users.role === "user"){
                          // console.log(users._id);
                           dispatch(auth())
                          dispatch(newFeeds())
                          dispatch(mvpDisplay())
                          dispatch(newFeedsLike())
                        }
                        else{
                          dispatch(reqVerification())
                        }
                       
                       
                      }) 
                    }
})
      .catch(error => {
        // console.log(error);
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  }
}
export const logout=()=> {
  return(dispatch)=>{
    localStorage.removeItem("user")
    dispatch(fetchUsersSuccess())
  }
 
}
export const UpdatePassword=(email_id,password)=> {
  return(dispatch)=>{
    const Token = () => localStorage.getItem("user");
  return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/updatePassword`,{
     
      email_id:email_id,
      password:password
     
     }, {
      headers:{authorization:`Bearer ${Token()}`}
     }).then((res)=>{
      // console.log(res.data);
      alert("password has been set")
          
    }).catch((e)=>console.log(e))
  }
}
export const DeleteAccount=()=> {
  return(dispatch)=>{
    const Token = () => localStorage.getItem("user");
  return axios.delete(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/deleteUser/`, {
   headers:{authorization:`Bearer ${Token()}`}
  }).then(
     (res)=> {
      localStorage.removeItem("user")
     
     }).catch((e)=>console.log(e))
    
  }
 
}
export const updateUser = (id,name,phone,profile,work,edu,des,cover) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.patch(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/updateUser/${id}`,{
     user_name:name,
     phone_number:phone,
     profile_picture:profile,
     work:work,
     education:edu,
     description:des
      },{
       headers:{authorization:`Bearer ${Token()}`}
      }).then(
        (res)=>{
        //  console.log("user",res.data);
         dispatch(fetchUsersSuccess(res.data))
         dispatch(newFeeds())
         dispatch(auth())
        
       }
       )
    
  }
}

export const auth = (id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/verification/status`,{},
      {
       headers:{authorization:`Bearer ${Token()}`}
      }
      ).then(
        (res)=>{
        //  console.log("status",res.data);
         dispatch(authSuccess(res.data))
        
        
       }
       )
    
  }
}
export const userRequest = (id) => {
               
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
     return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/verification/verification`,{
      user_id:id
      
     },{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> {
           
            // console.log(res.data)
            
            dispatch(auth())
           
         })
.catch((e)=>console.log(e))
    
    }
  }

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
export const authSuccess = authorization => {
  return {
    type: AUTH,
    payload:authorization
  }
}

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}