import axios from 'axios'
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  ADD_COMMENT_SUCCESS,
  ADD_REPLY_SUCCESS,

} from './Types'

export const Post = (user_id,post_text,postUrl,category) => {
  
  
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      console.log(category);
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

export const AddComment = (user_id,post_id,comment) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.post('http://localhost:4000/comment/addComment',{
         user_id:user_id,
    post_id:post_id,
    comment_text:comment,
      },{
       headers:{authorization:`Bearer ${Token()}`}
      }).then(
        (res)=>{
         console.log("post",res.data);
         const Token = () => localStorage.getItem("user");
         return axios.post('http://localhost:4000/comment/getComment',{
          
         },{
             headers:{authorization:`Bearer ${Token()}`}
          })
         .then(
             (res)=> {
                console.log(res.data)
                dispatch(CommentSuccess(res.data))
                dispatch(newFeeds())
             })
    .catch((e)=>console.log(e))
       }
       )
    
  }
}
export const newFeeds = () => {
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
     return axios.post('http://localhost:4000/user/newFeed/',{},{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> {
            console.log(res.data)
            dispatch(PostSuccess(res.data))
            dispatch(Comments())
         })
.catch((e)=>console.log(e))
    
    }
  }



  export const AccountPage = (e) => {
    return (dispatch) => {
      console.log("new",e);
      dispatch(PostSuccess(e))
      }
    }
    export const Comments = () => {
      return (dispatch) => {
        const Token = () => localStorage.getItem("user");
          axios.post('http://localhost:4000/comment/getComment/',{
       
          },{
            headers:{authorization:`Bearer ${Token()}`}
         }).then(
            (res)=>{
              console.log("api success",res.data);
               dispatch(CommentSuccess(res.data))
               dispatch(replys())
             }
           )
        
        }
      }
      export const AddReply = (user_id,comment_id,reply) => {
  
   
        return (dispatch) => {
          const Token = () => localStorage.getItem("user");
            
          return  axios.post('http://localhost:4000/reply/addReply',{
               user_id:user_id,
    comment_id:comment_id,
    reply_text:reply
            },{
             headers:{authorization:`Bearer ${Token()}`}
            }).then(
              (res)=>{
               console.log("post",res.data);
               const Token = () => localStorage.getItem("user");
               return axios.post('http://localhost:4000/reply/getReply',{
                
               },{
                   headers:{authorization:`Bearer ${Token()}`}
                })
               .then(
                   (res)=> {
                      console.log(res.data)
                      dispatch(ReplySuccess(res.data))
                      dispatch(Comments())
                   })
          .catch((e)=>console.log(e))
             }
             )
          
        }
      }

      export const replys = () => {
        return (dispatch) => {
          const Token = () => localStorage.getItem("user");
            axios.post('http://localhost:4000/reply/getReply',{
         
            },{
              headers:{authorization:`Bearer ${Token()}`}
           }).then(
              (res)=>{
                console.log("reply api success",res.data);
                 dispatch(ReplySuccess(res.data))
               }
             )
          
          }
        }
  

export const PostSuccess = posts => {

  return {
    type: ADD_POST_SUCCESS,
    payload: posts
  }
}
export const CommentSuccess = comments => {
console.log("success",comments);
  return {
    type:ADD_COMMENT_SUCCESS,
    payload:comments
  }
}
export const ReplySuccess = replys => {
  console.log("success",replys);
    return {
      type:ADD_REPLY_SUCCESS,
      payload:replys
    }
  }
  

export const PostFailure = () => {
  return {
    type: ADD_POST_FAILED,
    
  }
}
export const UpVote = (id,user_id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.post(`http://localhost:4000/post/like`,{
  _id:id,
  user_id:user_id
  },{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/user/newFeed/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(PostSuccess(res.data))
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const DownVote = (id,user_id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.post(`http://localhost:4000/post/dislike`,{
  _id:id,
  user_id:user_id
  },{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/user/newFeed/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(PostSuccess(res.data))
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const DeletePost = (id) => {
  console.log("delete",id);
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      console.log(Token());
    return axios.delete(`http://localhost:4000/post/deletePost/${id}`,{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{
     
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/user/newFeed/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(PostSuccess(res.data))
         }
        
        )
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const EditPost = (id,postId, post_text,post_url,category) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.patch(`http://localhost:4000/post/updatePost/${id}/${postId}`,{
      post_text:post_text,
      post_url:post_url,
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
export const comUpVote = (id,user_id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.post(`http://localhost:4000/comment/like`,{
  _id:id,
  user_id:user_id
  },{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/comment/getComment/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(CommentSuccess(res.data))
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const comDownVote = (id,user_id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.post(`http://localhost:4000/comment/dislike`,{
  _id:id,
  user_id:user_id
  },{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/comment/getComment/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(CommentSuccess(res.data))
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const comDelete = (id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.delete(`http://localhost:4000/comment/deleteComment/${id}`,{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/comment/getComment/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(CommentSuccess(res.data))
          dispatch(newFeeds())
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const repDelete = (id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.delete(`http://localhost:4000/reply/deleteReply/${id}`,{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/reply/getReply',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(ReplySuccess(res.data))
          dispatch(Comments())
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const repUpVote = (id,user_id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.post(`http://localhost:4000/reply/like`,{
  _id:id,
  user_id:user_id
  },{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/reply/getReply/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(ReplySuccess(res.data))
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}
export const repDownVote = (id,user_id) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return axios.post(`http://localhost:4000/reply/dislike`,{
  _id:id,
  user_id:user_id
  },{
    headers:{authorization:`Bearer ${Token()}`}
   }).then(
    (res)=>{console.log(res.data)
      const Token = () => localStorage.getItem("user");
      axios.post('http://localhost:4000/reply/getReply/',{},{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
         (res)=>{
          console.log(res.data)
          dispatch(ReplySuccess(res.data))
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))

    
    
  }
}