import {
    ADD_POST_FAILED,
    ADD_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    ADD_REPLY_SUCCESS,
    STATUS
  } from './Types'
  
  const initialState = {
    
   posts:[],
  comments:[],
  replys:[],
  

    
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
     
      case ADD_POST_SUCCESS:
        return {
         ...state,
         posts:action.payload
          
        }
        case ADD_COMMENT_SUCCESS:
        return {
         ...state,
         comments:action.payload
          
        }
       
        case ADD_REPLY_SUCCESS:
        return {
         ...state,
        replys:action.payload
          
        }
      case ADD_POST_FAILED:
        return {
            ...state
        }
      default: return state
    }
  }
  
  export default reducer