
import AuthService from '../auth/AuthService'
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  AUTH
} from './Types'

import { createBrowserHistory } from "history";
import {Comments, mvpCommentDisplay, mvpDisplay, MvpReplyDisplay, newFeeds, newFeedsLike} from './postActions';
import {reqVerification} from './verficationAction';
import axios from 'axios';

require("dotenv").config()

const history = createBrowserHistory();

export const fetchUsers = (email,password) => {
  
   
  return (dispatch) => {
    console.log(history);
    dispatch(fetchUsersRequest())
      AuthService.login(email,password)
      .then(response => {
        const users = response
        console.log(users.role);
        if(users.message === "logged in successfully"&& localStorage.getItem('user') !== null)
                    {
                      
                      AuthService.getCurrentUser().then(res => {
                        dispatch(fetchUsersSuccess(res))
                        if(users.role === "user"){
                          console.log(users._id);
                           dispatch(auth())
                          dispatch(newFeeds())
                          dispatch(mvpDisplay())
                          dispatch(mvpCommentDisplay())
                          dispatch(MvpReplyDisplay())
                          dispatch(newFeedsLike())
                        }
                        else{
                          dispatch(reqVerification())
                        }
                       
                       
                      }) 
                    }
})
      .catch(error => {
        console.log(error);
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
  }
}
export const updateUser = (id,name,phone,profile,work,edu,des,cover) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.patch(`${process.env.REACT_APP_PORT}/user/updateUser/${id}`,{
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
         console.log("user",res.data);
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
      
    return  axios.post(`${process.env.REACT_APP_PORT}/verification/status`,{},
      {
       headers:{authorization:`Bearer ${Token()}`}
      }
      ).then(
        (res)=>{
         console.log("status",res.data);
         dispatch(authSuccess(res.data))
        
        
       }
       )
    
  }
}
export const userRequest = (id) => {
               
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
     return axios.post(`${process.env.REACT_APP_PORT}/verification/verification`,{
      user_id:id
      
     },{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> {
           
            console.log(res.data)
            
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