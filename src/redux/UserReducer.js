import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    AUTH,
    
  } from './Types'
  
  const initialState = {
    loading: false,
    users:null,
    error: '',
    authorization:''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_USERS_SUCCESS:
        return {
          loading: false,
          users: action.payload,
          error: '',
          authorization:''
        }
        case AUTH:
          return {
           ...state,
           authorization:action.payload
        }
      case FETCH_USERS_FAILURE:
        return {
          loading: false,
          users: {},
          error: action.payload,
          authorization:{}
        }
      default: return state
    }
  }
  
  export default reducer