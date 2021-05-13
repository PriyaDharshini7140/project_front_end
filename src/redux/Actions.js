
import AuthService from '../auth/AuthService'
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from './Types'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const fetchUsers = (email,password) => {
  
   
  return (dispatch) => {
    console.log(history);
    dispatch(fetchUsersRequest())
      AuthService.login(email,password)
      .then(response => {
        const users = response
        console.log(users.role);
        if(users.message === "logged in successfully" && users.role === "user" && localStorage.getItem('user') !== null)
                    {
                      
                      AuthService.getCurrentUser().then(res => {
                        
                        dispatch(fetchUsersSuccess(res))
                      }) }
})
      .catch(error => {
        console.log(error);
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message))
      })
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


export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}