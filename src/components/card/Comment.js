import { Card, IconButton } from '@material-ui/core'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import'./PostCard.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import AuthService from "../../auth/AuthService"
import Services from '../../services/Services'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RedoRoundedIcon from '@material-ui/icons/RedoRounded';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
function Comment({post}) {
  const user = AuthService.getCurrentUser();
console.log(user);
    const [Data,setData] = useState([]);
    const [Open,setOpen] = useState(1);
    const [reply,setReply] = useState('');
    
    useEffect(()=>{
      Axios.post('http://localhost:4000/comment/getComment/',{
       post_id:post
       
      }).then(
        (res)=>{setData(res.data)
        
        
        
        }
       )
      },[post])
console.log(Data);

console.log(Open);

    return (
       <>
       {Data.map((e)=>
        <Card className="card" key={e._id}>
            <h4>
            {e.user_name}
            
           {user._id === e.user_id ? <div className="delete-icon">
          <IconButton>
              <HighlightOffIcon onClick={()=>Services.deleteComment(e._id)}/>
               </IconButton>
               </div> :<></>}
          
            </h4>
            
            <div>
            {e.comment_text}  
             
            </div>
              
             <div>
             <IconButton>
               <ThumbUpAltOutlinedIcon  onClick={()=>{
                        
                        Services.commentUpVotes(e._id,user._id)
                  }}/>  
               </IconButton>{e.up_vote.length}
              <IconButton>
                   <ThumbDownAltOutlinedIcon onClick={()=>{
                        
                        Services.commentDownVotes(e._id,user._id)
                  }}/>  
                   </IconButton>{e.down_vote.length} 
                   <IconButton>
                   <RedoRoundedIcon  onClick={()=>{
                        //   console.log(Open+1);
                          const add = Open+1;
                           setOpen(add)
                       }}/> 
                   </IconButton>{e.replys.length}
                   <div className="comments">
                <div className="commentspost">
                    <input placeholder="add reply"   type="text" onChange={(e)=>setReply(e.target.value)}/>
                    <IconButton>
                    <SendRoundedIcon onClick={()=>
                    Services.addReply(user._id,user.user_name,e._id,reply)} />
                    </IconButton>
                </div>
                </div>
                {Open % 2 === 0 ? <> 
                  {e.replys.map(a=><div className="reply">
                    <h4>
            {a.user_name}
            
            {user._id === a.user_id ? <div className="delete-icon">
          <IconButton>
              <HighlightOffIcon onClick={()=>Services.deleteReply(a._id)}/>
               </IconButton>
               </div> :<></>}
            </h4>
              {a.reply_text}    
              <IconButton>
               <ThumbUpAltOutlinedIcon  onClick={()=>{
                        
                        Services.replyUpVotes(a._id,user._id)
                  }}/>  
               </IconButton>{a.up_vote.length}
              <IconButton>
                   <ThumbDownAltOutlinedIcon onClick={()=>{
                         Services.replyDownVotes(a._id,user._id)
                  }}/>  
                   </IconButton>{a.down_vote.length} 
                   
                </div>)}
                </>:<></>
}
             </div>
            </Card>)}  
            
       </>
    )
}

export default Comment
