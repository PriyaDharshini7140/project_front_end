import {
    ADD_POST_FAILED,
    ADD_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    ADD_REPLY_SUCCESS,
    ADD_MVP_SUCCESS,
   ADD_MVP_COMMENT_SUCCESS,
   ADD_MVP_REPLY_SUCCESS ,
   ADD_LIKE_SORTED_SUCCESS
  } from './Types'
  
  const initialState = {
    
   posts:[],
  comments:[],
  replys:[],
  mvp:[],
  mvpComments:[],
  mvpReplys:[],
 LikeSortedPosts:[]
    
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
        case ADD_MVP_SUCCESS:
        return {
         ...state,
         mvp:action.payload
          
        }
        case ADD_MVP_COMMENT_SUCCESS:
        return {
         ...state,
         mvpComments:action.payload
          
        }
        case ADD_MVP_REPLY_SUCCESS:
        return {
         ...state,
        mvpReplys:action.payload
          
        }
        case ADD_LIKE_SORTED_SUCCESS:
          return {
           ...state,
           LikeSortedPosts:action.payload
            
          }
      default: return state
    }
  }
  
  export default reducer