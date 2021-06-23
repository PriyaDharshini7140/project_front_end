import {
   REPORT,
    STATUS
  } from './Types'
  
  const initialState = {
    
 
  status:[],
  reports:null

    
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
    
        case STATUS:
        return {
         ...state,
         status:action.payload
          
        }
        case REPORT:
          return {
           ...state,
           reports:action.payload
            
          }
         
      default: return state
    }
  }
  
  export default reducer