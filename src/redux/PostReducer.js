import {
    ADD_POST_FAILED,
    ADD_POST_SUCCESS
  } from './Types'
  
  const initialState = {
    
   posts:[]
    
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
     
      case ADD_POST_SUCCESS:
        return {
         ...state,
         posts:action.payload
          
        }
      case ADD_POST_FAILED:
        return {
            ...state
        }
      default: return state
    }
  }
  
  export default reducer