import { Avatar, InputAdornment, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import moment from "moment"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { BsReplyFill} from "react-icons/bs";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {DeleteMvpReply, MvpReplyUpVote, MvpReplyDownVote} from '../../redux/postActions';
function MvpReplys({Mvp}) {
    const user = useSelector((state)=> state.user.users)
    const dispatch = useDispatch()
    console.log(Mvp);
    
   
   const replys = useSelector((state)=>state.post.mvpReplys)
   console.log(replys);
    return (
        <div>
           {replys.map((e)=><>
           {e.comment_id === Mvp ?<>
           <div className="header">
           <div className="nav-link">
            <Avatar alt={e.user.user_name} src={e.user.profile_picture}/> 
            <Link to={{pathname:'/userProfile',state:e.user}} >
                   {e.user.user_name}<VerifiedUserRoundedIcon/></Link> 
                   {moment(e.createdAt).format("MMMD,YYYY")}
                   </div>
                   {user._id === e.user._id ? <div>
        
            <HighlightOffIcon onClick={()=>dispatch( DeleteMvpReply(e._id))}/>
            
             </div>
             
             :<></>}
             </div>
             {e.reply_text}
             <div>
    <ThumbUpAltIcon 
               onClick={()=>dispatch(MvpReplyUpVote(e._id,e.user_id))}
                  />
                  {e.up_vote.length > 0?e.up_vote.length:""}
                     
                   
                
                       <ThumbDownAltIcon 
                          onClick={()=>dispatch(MvpReplyDownVote(e._id,e.user_id))}
                      />
                      {e.down_vote.length > 0?e.down_vote.length:""}
                          
                       
                          
                    </div>       
                
           </>:<></>}
           </>)}
        </div>
    )
}

export default MvpReplys

