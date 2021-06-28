import { Avatar} from '@material-ui/core';
import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import moment from "moment"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import {DeleteMvpReply, MvpReplyUpVote, MvpReplyDownVote} from '../../redux/postActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
// import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
function MvpReplys({Mvp,owner}) {
    const user = useSelector((state)=> state.user.users)
    const dispatch = useDispatch()
    // console.log(Mvp);
    
   
   const replys = useSelector((state)=>state.post.mvpReplys)
//    console.log(replys);
    return (
        <div>
           {replys.map((e)=><>
           {e.comment_id === Mvp ?<div className="mvp-comments-card">
            <div className="head-mvp">
           
           <Avatar style={{marginTop:".2rem"}} src={e.user.user_profile}/>
   <div className="user-name">
           <Link to={{pathname:'/userProfile',state:e.user}}  className="user-name-link">
                      {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/> </Link> <br/>
                      <div style={{color:"white",fontSize:"small"}}>{moment(e.createdAt).format("MMMD,YYYY")}</div>
                      </div>
                   {user._id === e.user._id || owner === user._id? <div style={{marginLeft:"7rem"}}>
        
            <DeleteRoundedIcon style={{cursor:"pointer"}} onClick={()=>dispatch( DeleteMvpReply(e._id))}/>
            
             </div>
             
             :<></>}
             </div>
             <div>
             {e.reply_text}
             </div>
             <div className="footer">
                 <div style={{marginLeft:".5rem"}}>
    <ThumbUpAltIcon style={{cursor:"pointer"}} className={e.up_vote.includes(user._id)? "l":""}
               onClick={()=>dispatch(MvpReplyUpVote(e._id,user._id))}
                  />
                  {e.up_vote.length > 0?e.up_vote.length:""}
                     
                  </div>
                <div style={{marginLeft:".5rem"}}>
                       <ThumbDownAltIcon style={{cursor:"pointer"}} className={e.down_vote.includes(user._id)? "l":""}
                          onClick={()=>dispatch(MvpReplyDownVote(e._id,user._id))}
                      />
                      {e.down_vote.length > 0?e.down_vote.length:""}
                          
                      </div>
                          
                    </div>       
                
           </div>:<></>}
           </>)}
        </div>
    )
}

export default MvpReplys

