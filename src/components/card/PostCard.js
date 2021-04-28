import { Avatar, Card, IconButton, Modal } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Axios from 'axios'
import'./PostCard.css'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Comment from './Comment';

const comment=()=>{
      console.log("comments");
    // <div className="chat__footer">
    
    <form>
        <input placeholder="add a comment" type="text"/>
        <button>send a message</button>
    </form>
    // </div>

}




function PostCard({user}) {
console.log(user);
const addComment =(user_id,post_id,comment,up_vote,down_vote)=>{
     
console.log(user_id,post_id,comment,up_vote,down_vote);

Axios.post('http://localhost:4000/comment/addComment/',{
    user_id:user_id,
    post_id:post_id,
    comment_text:comment,
    up_vote:up_vote,
    down_vote:down_vote
}).then(
        (res)=>console.log(res.data),
       ).catch((e)=>console.log(e))

}

  
    const [Data,setData] = useState([]);
    const [comment,setComment] = useState('');
    const [up_vote,setup_vote] = useState('0');
    const [down_vote,setdown_vote] = useState('0');
    useEffect(()=>{
      Axios.post('http://localhost:4000/user/newFeed/').then(
        (res)=>setData(res.data),
       )
      },[])
    return (
     <>
     {Data.map((e)=> <>
          {e.posts.length > 0 ? <>{e.posts.map((a)=><Card className='homepage__card' key={a._id}>
              
          <div className="homepage__card__header">
 
               <Avatar alt={e.user_name} src="/static/images/avatar/1.jpg" className="homepage__card__header__avatar" />
               <div className="homepage__card__body">
               {e.user_name}
               <div className="category">
              -Category{a.category}</div>
               </div>
               
               <div className="homepage__card__headerRight">
               </div>
           </div>
           
           <div className="post" id={a._id}>
         {a.post_text}
         {/* {e.posts.map(a=> a.post_url )} */}
           </div>
           <div className="card_body">
           <IconButton>
               <ThumbUpAltOutlinedIcon/>  
               </IconButton>{a.up_vote}
              <IconButton>
                   <ThumbDownAltOutlinedIcon/>  
                   </IconButton>{a.down_vote} 
                   <IconButton>
                       <CommentOutlinedIcon/>
                   </IconButton>
                   <div className="comments">
                <div className="commentspost">
                    <input placeholder="add comment"   type="text" onChange={(e)=>setComment(e.target.value)}/>
                    <IconButton>
                    <SendRoundedIcon onClick={()=>addComment(user._id,a._id,comment,up_vote,down_vote)}/>
                    </IconButton>
                </div>
               
            </div>
           <Comment post={a._id} user={user}/>
           </div>
          
          </Card>)}</>
           : <>{console.log("no posts")}</>}
            </>)}
     </>
           
          
       
    )
}

export default PostCard
