import {
    COMMENT_POST_FAILED,
    COMMENT_POST_SUCCESS
  } from './Types'
  
  const initialState = {
    
   comments:[]
    
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
     
      case COMMENT_POST_SUCCESS:
        return {
         ...state,
         comments:action.payload
          
        }
      case COMMENT_POST_FAILED:
        return {
            ...state
        }
      default: return state
    }
  }
  
  export default reducer