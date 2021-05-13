import axios from 'axios'
import Services from '../services/Services'
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILED
} from './Types'

export const Post = (user_id,post_text,postUrl,category) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.post('http://localhost:4000/post/addPost',{
        user_id:user_id,
        post_text:post_text,
        post_url:postUrl,
        category:category,
      },{
       headers:{authorization:`Bearer ${Token()}`}
      }).then(
        (res)=>{
         console.log("post",res.data);
         const Token = () => localStorage.getItem("user");
         return axios.post('http://localhost:4000/user/newFeed/',{},{
             headers:{authorization:`Bearer ${Token()}`}
          })
         .then(
             (res)=> {
                console.log(res.data)
                dispatch(PostSuccess(res.data))
             })
    .catch((e)=>console.log(e))
       }
       )
    
  }
}
export const newFeeds = (e) => {
  return (dispatch) => {
    console.log("new",e);
    dispatch(PostSuccess(e))
    }
  }


export const PostSuccess = posts => {

  return {
    type: ADD_POST_SUCCESS,
    payload: posts
  }
}


export const PostFailure = () => {
  return {
    type: ADD_POST_FAILED,
    
  }
}