import axios from "axios";
import AuthService from "../auth/AuthService";




class Service {
  details = (id) => {
      console.log(id);

       
     return  axios.post('http://localhost:4000/user/particularUser',{
         _id:id
       }).then(
         (res)=>console.log(res.data),
        )
     
   
 }
   
   addComment =(user_id,user_name,post_id,comment)=>{

 return axios.post('http://localhost:4000/comment/addComment/',{
    user_id:user_id,
    user_name:user_name,
    post_id:post_id,
    comment_text:comment,
    
}).then(
        (res)=>{
       console.log(res.data.data.user_id)
      }
       ).catch((e)=>console.log(e))

}
addReply=(user_id,user_name,comment_id,reply_text)=>{

    
   return axios.post('http://localhost:4000/reply/addReply/',{
       user_id:user_id,
       user_name:user_name,
       comment_id:comment_id,
       reply_text:reply_text,
      
       }).then(
         (res)=>console.log(res.data)
         // (res)=>console.log(res.data)
        ).catch((e)=>console.log(e))
}
 handlePost = (user_id,a,postUrl,c) => {
       

     
    
  }

  handleDelete = (id) => {
     
      console.log(id);
      alert("do you want to delete this post")
     return axios.delete(`http://localhost:4000/post/deletePost/${id}`).then(
        (res)=>console.log(res.data),
       ).catch((e)=>console.log(e))
   };

deleteComment = (id) => {
     
      console.log(typeof id);
      // alert("do you want to delete this post")
     return axios.delete(`http://localhost:4000/comment/deleteComment/${id}`).then(
        (res)=>console.log(res.data),
       ).catch((e)=>console.log(e))
     };
    deleteReply = (_id) => {
     
      console.log(_id);
      // alert("do you want to delete this post")
     return axios.delete(`http://localhost:4000/reply/deleteReply/${_id}`).then(
        (res)=>console.log(res.data),
       ).catch((e)=>console.log(e))
   };
  
  
editPost =(id,postId, post_text,post_url,category)=>{
   console.log(id,postId,post_text,post_url);
  
 

  return axios.patch(`http://localhost:4000/post/updatePost/${id}/${postId}`,{
   post_text:post_text,
   post_url:post_url,
   category:category,
  }).then(
    (res)=>{console.log(res.data)
   alert(res.data.error)
   }
   
    ,
   ).catch((e)=>console.log(e))
}
DeleteAccount = (id) => {
     
   console.log(id);
  
  return axios.delete(`http://localhost:4000/user/deleteUser/${id}`).then(
     (res)=>{console.log(res.data)
      AuthService.logout()
     
   }
    ).catch((e)=>console.log(e))
    
};

editDownVotes =(id,user_id)=>{
   console.log(user_id);
   return axios.post(`http://localhost:4000/post/dislike`,{
  _id:id,
  user_id:user_id
  }).then(
    (res)=>console.log(res.data),
   ).catch((e)=>console.log(e))
}

editUpVotes =(id,user_id)=>{
   console.log(user_id);
   return axios.post(`http://localhost:4000/post/like`,{
  _id:id,
  user_id:user_id
  }).then(
    (res)=>{console.log(res.data)
      axios.post('http://localhost:4000/user/newFeed/').then(
         (res)=>{
          console.log(res.data)
         }
        
        )
   
   },
   ).catch((e)=>console.log(e))
}

newFeeds=()=>{
   const Token = () => localStorage.getItem("user");
     return axios.post('http://localhost:4000/user/newFeed/',{},{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> {
            console.log(res.data)
           return res.data
         })
.catch((e)=>console.log(e))
}

commentDownVotes =(id,user_id)=>{
   console.log(user_id);
   return axios.post(`http://localhost:4000/comment/dislike`,{
  _id:id,
  user_id:user_id
  }).then(
    (res)=>console.log(res.data),
   ).catch((e)=>console.log(e))
}

commentUpVotes =(id,user_id)=>{
   console.log(user_id);
   return axios.post(`http://localhost:4000/comment/like`,{
  _id:id,
  user_id:user_id
  }).then(
    (res)=>console.log(res.data),
   ).catch((e)=>console.log(e))
}

replyDownVotes =(id,user_id)=>{
   console.log(user_id);
   return axios.post(`http://localhost:4000/reply/dislike`,{
  _id:id,
  user_id:user_id
  }).then(
    (res)=>console.log(res.data),
   ).catch((e)=>console.log(e))
}

replyUpVotes =(id,user_id)=>{
   console.log(user_id);
   return axios.post(`http://localhost:4000/reply/like`,{
  _id:id,
  user_id:user_id
  }).then(
    (res)=>console.log(res.data),
   ).catch((e)=>console.log(e))
}

}

export default new Service();