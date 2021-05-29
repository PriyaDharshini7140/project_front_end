import axios from 'axios';
import {
  COMMENT_POST_SUCCESS,
 COMMENT_POST_FAILED
} from './Types'

export const AddComment = (user_id,user_name,post_id,comment) => {
  
   
  return (dispatch) => {
    const Token = () => localStorage.getItem("user");
      
    // return  axios.post('http://localhost:4000/comment/addComment',{
    //      user_id:user_id,
    // post_id:post_id,
    // comment_text:comment,
    //   },{
    //    headers:{authorization:`Bearer ${Token()}`}
    //   }).then(
    //     (res)=>{
    //      console.log("post",res.data);
    //      const Token = () => localStorage.getItem("user");
    //      return axios.post('http://localhost:4000/comment/getComment',{},{
    //          headers:{authorization:`Bearer ${Token()}`}
    //       })
    //      .then(
    //          (res)=> {
    //             console.log(res.data)
    //             dispatch(CommentSuccess(res.data))
    //          })
    // .catch((e)=>console.log(e))
    //    }
    //    )
    
  }
}





export const CommentSuccess = comments => {

  return {
    type: COMMENT_POST_SUCCESS,
    payload: comments
  }
}


export const CommentFailure = () => {
  return {
    type: COMMENT_POST_FAILED,
    
  }
}
// export const UpVote = (id,user_id) => {
  
   
//   return (dispatch) => {
//     const Token = () => localStorage.getItem("user");
      
//     return axios.post(`http://localhost:4000/post/like`,{
//   _id:id,
//   user_id:user_id
//   },{
//     headers:{authorization:`Bearer ${Token()}`}
//    }).then(
//     (res)=>{console.log(res.data)
//       const Token = () => localStorage.getItem("user");
//       axios.post('http://localhost:4000/user/newFeed/',{},{
//         headers:{authorization:`Bearer ${Token()}`}
//        }).then(
//          (res)=>{
//           console.log(res.data)
//           dispatch(PostSuccess(res.data))
//          }
        
//         )
   
//    },
//    ).catch((e)=>console.log(e))

    
    
//   }
// }
// export const DownVote = (id,user_id) => {
  
   
//   return (dispatch) => {
//     const Token = () => localStorage.getItem("user");
      
//     return axios.post(`http://localhost:4000/post/dislike`,{
//   _id:id,
//   user_id:user_id
//   },{
//     headers:{authorization:`Bearer ${Token()}`}
//    }).then(
//     (res)=>{console.log(res.data)
//       const Token = () => localStorage.getItem("user");
//       axios.post('http://localhost:4000/user/newFeed/',{},{
//         headers:{authorization:`Bearer ${Token()}`}
//        }).then(
//          (res)=>{
//           console.log(res.data)
//           dispatch(PostSuccess(res.data))
//          }
        
//         )
   
//    },
//    ).catch((e)=>console.log(e))

    
    
//   }
// }
// export const DeletePost = (id) => {
//   console.log("delete",id);
   
//   return (dispatch) => {
//     const Token = () => localStorage.getItem("user");
//       console.log(Token());
//     return axios.delete(`http://localhost:4000/post/deletePost/${id}`,{
//     headers:{authorization:`Bearer ${Token()}`}
//    }).then(
//     (res)=>{
     
//       const Token = () => localStorage.getItem("user");
//       axios.post('http://localhost:4000/user/newFeed/',{},{
//         headers:{authorization:`Bearer ${Token()}`}
//        }).then(
//          (res)=>{
//           console.log(res.data)
//           dispatch(PostSuccess(res.data))
//          }
        
//         )
//    },
//    ).catch((e)=>console.log(e))

    
    
//   }
// }
// export const EditPost = (id,postId, post_text,post_url,category) => {
  
   
//   return (dispatch) => {
//     const Token = () => localStorage.getItem("user");
      
//     return  axios.patch(`http://localhost:4000/post/updatePost/${id}/${postId}`,{
//       post_text:post_text,
//       post_url:post_url,
//       category:category,
//       },{
//        headers:{authorization:`Bearer ${Token()}`}
//       }).then(
//         (res)=>{
//          console.log("post",res.data);
//          const Token = () => localStorage.getItem("user");
//          return axios.post('http://localhost:4000/user/newFeed/',{},{
//              headers:{authorization:`Bearer ${Token()}`}
//           })
//          .then(
//              (res)=> {
//                 console.log(res.data)
//                 dispatch(PostSuccess(res.data))
//              })
//     .catch((e)=>console.log(e))
//        }
//        )
    
//   }
// }
