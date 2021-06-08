import axios from 'axios'
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILED,
  ADD_COMMENT_SUCCESS,
  ADD_REPLY_SUCCESS,
  ADD_MVP_SUCCESS,
  ADD_MVP_COMMENT_SUCCESS,
   ADD_MVP_REPLY_SUCCESS,
   ADD_LIKE_SORTED_SUCCESS

} from './Types'

export const Post = (user_id,post_text,postUrl,category,title,scope,link,enhancement,frontEnd,backEnd,db) => {
  
  
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      console.log(category);
    return  axios.post('http://localhost:4000/post/addPost',{
        user_id:user_id,
        idea_title:title,
        post_text:post_text,
        scope:scope,
        post_url:postUrl,
        category:category,
        link:link,
        enhancement:enhancement,
        requirements:{
          frontend:frontEnd,
          backend:backEnd,
          database:db

        }
        
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
  export const newFeedsLike = () => {
    return (dispatch) => {
      const Token = () => localStorage.getItem("user");
       return axios.post('http://localhost:4000/user/newFeed/',{},{
           headers:{authorization:`Bearer ${Token()}`}
        })
       .then(
           (res)=> {
            const sorted =  res.data.sort((a,b)=>{
                return b.up_vote_count  - a.up_vote_count;
               })
           dispatch(LikePostSuccess(sorted))
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
export const LikePostSuccess = LikeSortedPosts => {

  return {
    type: ADD_LIKE_SORTED_SUCCESS,
    payload: LikeSortedPosts
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
     dispatch(newFeeds())
   
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
export const EditPost = (id,postId,postText,postUrl,personName,title,scope,link,enhancement,frontEnd,backEnd,db) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    return  axios.patch(`http://localhost:4000/post/updatePost/${id}/${postId}`,{
    
      idea_title:title,
      post_text:postText,
      scope:scope,
      post_url:postUrl,
      category:personName,
      link:link,
      enhancement:enhancement,
      requirements:{
        frontend:frontEnd,
        backend:backEnd,
        database:db

      }
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
export const mvp = (user_id,Post_id,title,link) => {
          
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
     return axios.post('http://localhost:4000/solution/addSolution',{
      
      user_id:user_id,
      post_id:Post_id,
     solution_title:title,
     link:link
     },{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> {
          //  alert(res.data.status)
            console.log("mvp",res.data)
            dispatch(mvpDisplay())
            
         })
.catch((e)=>console.log(e))
    
    }
  }

  export const mvpDisplay = () => {
          
    return (dispatch) => {
      const Token = () => localStorage.getItem("user");
       return axios.post('http://localhost:4000/solution/getMvp',{},{
           headers:{authorization:`Bearer ${Token()}`}
        })
       .then(
           (res)=> {
            //  alert(res.data.status)
              console.log(res.data)
              dispatch(mvpSuccess(res.data))
              dispatch(mvpCommentDisplay())
           })
  .catch((e)=>console.log(e))
      
      }
    }


  export const mvpSuccess = mvp => {
    console.log("success",mvp);
      return {
        type:ADD_MVP_SUCCESS,
        payload:mvp
      }
    }
    export const mvpUpVote = (id,user_id) => {
  
   
      return (dispatch) => {
        const Token = () => localStorage.getItem("user");
          
        return axios.post(`http://localhost:4000/solution/like`,{
      _id:id,
      user_id:user_id
      },{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
        (res)=>{console.log(res.data)
          dispatch(mvpDisplay())
       
       },
       ).catch((e)=>console.log(e))
    
        
        
      }
    }
    export const mvpDownVote = (id,user_id) => {
  
   
      return (dispatch) => {
        const Token = () => localStorage.getItem("user");
          
        return axios.post(`http://localhost:4000/solution/dislike`,{
      _id:id,
      user_id:user_id
      },{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
        (res)=>{console.log(res.data)
  dispatch(mvpDisplay())
       
       },
       ).catch((e)=>console.log(e))
    
        
        
      }
    }
    export const DeleteMvp = (id) => {
      console.log("delete",id);
       
      return (dispatch) => {
        const Token = () => localStorage.getItem("user");
          console.log(Token());
        return axios.delete(`http://localhost:4000/solution/deleteMvp/${id}`,{
        headers:{authorization:`Bearer ${Token()}`}
       }).then(
        (res)=>{
         
          dispatch(mvpDisplay())
       },
       ).catch((e)=>console.log(e))
    
        
        
      }
    }
    export const mvpCommentDisplay = () => {
          
      return (dispatch) => {
        const Token = () => localStorage.getItem("user");
         return axios.post('http://localhost:4000/mvpComment/getComment',{},{
             headers:{authorization:`Bearer ${Token()}`}
          })
         .then(
             (res)=> {
              //  alert(res.data.status)
                console.log(res.data)
                dispatch(mvpCommentSuccess(res.data))
                // dispatch(MvpReplyDisplay()) 
             })
    .catch((e)=>console.log(e))
        
        }
      }
    export const AddMvpComment = (user_id,solution_id,comment) => {
  
   
      return (dispatch) => {
        const Token = () => localStorage.getItem("user");
          
        return  axios.post('http://localhost:4000/mvpComment/addMvpComment',{
             user_id:user_id,
       solution_id:solution_id,
        comment_text:comment,
          },{
           headers:{authorization:`Bearer ${Token()}`}
          }).then(
            (res)=>{
             console.log("post",res.data);
             dispatch(mvpCommentDisplay())
             dispatch(mvpDisplay())
           }
           )
        
      }
    }
    export const mvpCommentSuccess = mvpComments => {
      console.log("success",replys);
        return {
          type:ADD_MVP_COMMENT_SUCCESS,
          payload:mvpComments
        }
      }
      export const MvpComUpVote = (id,user_id) => {
  
   
        return (dispatch) => {
          const Token = () => localStorage.getItem("user");
            
          return axios.post(`http://localhost:4000/mvpComment/like`,{
        _id:id,
        user_id:user_id
        },{
          headers:{authorization:`Bearer ${Token()}`}
         }).then(
          (res)=>{console.log(res.data)
            dispatch(mvpCommentDisplay())
         
         },
         ).catch((e)=>console.log(e))
      
          
          
        }
      }
      export const MvpComDownVote = (id,user_id) => {
        
         
        return (dispatch) => {
          const Token = () => localStorage.getItem("user");
            
          return axios.post(`http://localhost:4000/mvpComment/dislike`,{
        _id:id,
        user_id:user_id
        },{
          headers:{authorization:`Bearer ${Token()}`}
         }).then(
          (res)=>{console.log(res.data)
            dispatch(mvpCommentDisplay())
         },
         ).catch((e)=>console.log(e))
      
          
          
        }
      }
      export const DeleteMvpCom = (id) => {
        console.log("delete",id);
         
        return (dispatch) => {
          const Token = () => localStorage.getItem("user");
            console.log(Token());
          return axios.delete(`http://localhost:4000/mvpComment/deleteComment/${id}`,{
          headers:{authorization:`Bearer ${Token()}`}
         }).then(
          (res)=>{
           
            dispatch(mvpCommentDisplay())
         },
         ).catch((e)=>console.log(e))
      
          
          
        }
      }
      export const mvpReplySuccess = mvpReplys => {
        console.log("success",replys);
          return {
            type:ADD_MVP_REPLY_SUCCESS,
            payload:mvpReplys
          }
        }
        export const AddMvpReply = (user_id,comment_id,reply) => {
  
   
          return (dispatch) => {
            const Token = () => localStorage.getItem("user");
              
            return  axios.post('http://localhost:4000/mvpReply/addReply',{
                 user_id:user_id,
      comment_id:comment_id,
      reply_text:reply
              },{
               headers:{authorization:`Bearer ${Token()}`}
              }).then(
                (res)=>{
                dispatch(MvpReplyDisplay()) 
               }
               )
            
          }
        }
        export const MvpReplyDisplay = () => {
  
   
          return (dispatch) => {
            const Token = () => localStorage.getItem("user");
              
         
                 
                 return axios.post('http://localhost:4000/mvpReply/getReply',{
                  
                 },{
                     headers:{authorization:`Bearer ${Token()}`}
                  })
                 .then(
                     (res)=> {
                        console.log(res.data)
                        dispatch(mvpReplySuccess(res.data))
                        dispatch(mvpCommentDisplay())
                     })
            .catch((e)=>console.log(e))
               }
              } 
              export const MvpReplyUpVote = (id,user_id) => {
  
   
                return (dispatch) => {
                  const Token = () => localStorage.getItem("user");
                    
                  return axios.post(`http://localhost:4000/mvpReply/like`,{
                _id:id,
                user_id:user_id
                },{
                  headers:{authorization:`Bearer ${Token()}`}
                 }).then(
                  (res)=>{console.log(res.data)
                    dispatch(MvpReplyDisplay())
                 
                 },
                 ).catch((e)=>console.log(e))
              
                  
                  
                }
              }
              export const MvpReplyDownVote = (id,user_id) => {
                
                 
                return (dispatch) => {
                  const Token = () => localStorage.getItem("user");
                    
                  return axios.post(`http://localhost:4000/mvpReply/dislike`,{
                _id:id,
                user_id:user_id
                },{
                  headers:{authorization:`Bearer ${Token()}`}
                 }).then(
                  (res)=>{console.log(res.data)
                    dispatch(MvpReplyDisplay())
                 },
                 ).catch((e)=>console.log(e))
              
                  
                  
                }
              }
              export const DeleteMvpReply = (id) => {
                console.log("delete",id);
                 
                return (dispatch) => {
                  const Token = () => localStorage.getItem("user");
                    console.log(Token());
                  return axios.delete(`http://localhost:4000/mvpReply/deleteReply/${id}`,{
                  headers:{authorization:`Bearer ${Token()}`}
                 }).then(
                  (res)=>{
                   
                    dispatch(MvpReplyDisplay())
                 },
                 ).catch((e)=>console.log(e))
              
                  
                  
                }
              }
  