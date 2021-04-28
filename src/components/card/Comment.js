import { Card, IconButton } from '@material-ui/core'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import'./PostCard.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
function Comment({post,user}) {
console.log(user);
    const [Data,setData] = useState([]);
    const [reply,setReply] = useState('');
    const [up_vote,setup_vote] = useState('0');
    const [down_vote,setdown_vote] = useState('0');
    useEffect(()=>{
      Axios.post('http://localhost:4000/comment/getComment/',{
       post_id:post
      }).then(
        (res)=>setData(res.data),
        (res)=>console.log(res.data)
       )
      },[post])
console.log(Data);


const addReply=(user_id,comment_id,reply_text,up_vote,down_vote)=>{

    console.log(user_id,comment_id,reply_text,up_vote,down_vote);
    Axios.post('http://localhost:4000/reply/addReply/',{
       user_id:user_id,
       comment_id:comment_id,
       reply_text:reply_text,
       up_vote:up_vote,
       down_vote:down_vote
       }).then(
         (res)=>console.log(res.data),
         (res)=>console.log(res.data)
        )
}
    return (
       <>
       {Data.map((e)=>
        <Card className="card" key={e._id}>
            <h4>
            {user.user_name}
            </h4>
            
            <div>
            {e.comment_text}  
            </div>
              
             <div>
             <IconButton>
               <ThumbUpAltOutlinedIcon/>  
               </IconButton>{e.up_vote}
              <IconButton>
                   <ThumbDownAltOutlinedIcon/>  
                   </IconButton>{e.down_vote} 
                   
                   <div className="comments">
                <div className="commentspost">
                    <input placeholder="add reply"   type="text" onChange={(e)=>setReply(e.target.value)}/>
                    <IconButton>
                    <SendRoundedIcon onClick={()=>addReply(user._id,e._id,reply,up_vote,down_vote)} />
                    </IconButton>
                </div>
                </div>
                {e.replys.map(a=><div className="reply">
                    <h4>
            {user.user_name}
            </h4>
              {a.reply_text}    
              <IconButton>
               <ThumbUpAltOutlinedIcon/>  
               </IconButton>{a.up_vote}
              <IconButton>
                   <ThumbDownAltOutlinedIcon/>  
                   </IconButton>{a.down_vote} 
                   
                </div>)}
             </div>
            </Card>)}  
            
       </>
    )
}

export default Comment
