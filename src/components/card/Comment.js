import { Avatar,IconButton } from '@material-ui/core'

import React, { useEffect, useState } from 'react'
import'./PostCard.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RedoRoundedIcon from '@material-ui/icons/RedoRounded';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import { useSelector,useDispatch } from 'react-redux';
import ShowMoreText from 'react-show-more-text';
import {comUpVote,comDownVote, comDelete, AddReply} from '../../redux/postActions';
import { Link } from 'react-router-dom';
import Reply from './Reply';
function Comment({post}) {
  const user = useSelector((state)=> state.user.users)
console.log(post);
const dispatch = useDispatch();
    const Data = useSelector((state)=>state.post.comments)
    const rep = useSelector((state)=>state.post.replys)
    const [Open,setOpen] = useState(1);
    const [reply,setReply] = useState('');
    console.log(Data.map(e=>e._id));
    useEffect(()=>{
      
      })
console.log(Data);
console.log(rep);
console.log(Open);

    return (
       <>
       {Data.map((e)=>
        <>
         {post === e.post_id? <div className="card" key={e._id}>
         
          <h5 className='cardheader'>
            
            <Avatar alt={e.user.user_name} src={e.user.profile_picture}/> 
            <Link to={{pathname:'/userProfile',state:e.user_id}} className="nav-link">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/></Link> 
         
           
          
          
         {user._id === e.user._id ? <div>
        <IconButton>
            <HighlightOffIcon onClick={()=>dispatch(comDelete(e._id))}/>
             </IconButton>
             </div> :<></>}
        
          </h5>
          <br/>
          <div className="text">
          <ShowMoreText
               
               lines={3}
               more='Show more'
               less='Show less'
              
               expanded={false}
              
           >{e.comment_text}</ShowMoreText>
           
          </div>
            
           <div className='footer'>
           <IconButton>
             <ThumbUpAltOutlinedIcon  onClick={()=>{
                      
                      dispatch(comUpVote(e._id,user._id))
                }}/>  {e.up_vote.length}
             </IconButton>
            <IconButton>
                 <ThumbDownAltOutlinedIcon onClick={()=>{
                      
                      dispatch(comDownVote(e._id,user._id))
                }}/> {e.down_vote.length}  
                 </IconButton>
                 <IconButton>
                 <RedoRoundedIcon  onClick={()=>{
                      //   console.log(Open+1);
                        const add = Open+1;
                         setOpen(add)
                     }}/>{e.replys.length}
                 </IconButton>
                 <div className="replys">
              <div className="reply">
                  <input placeholder="add reply"   type="text" onChange={(e)=>setReply(e.target.value)}/>
                  <IconButton >
                  <SendRoundedIcon className='iconbutton' onClick={()=>
                 dispatch(AddReply(user._id,e._id,reply))} />
                  </IconButton>
              </div>
              </div>
              </div>
              {Open % 2 === 0 ? 
           <Reply comment={e._id}/>:<></>}

           
         
         </div>
         
         :console.log("")
        }
        </>
            )}  
            
       </>
    )
}

export default Comment
