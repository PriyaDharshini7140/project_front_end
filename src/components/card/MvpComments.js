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
import { MvpComDownVote, MvpComUpVote ,DeleteMvpCom, AddMvpReply} from '../../redux/postActions';
import MvpReplys from './MvpReply';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Tooltip from '@material-ui/core/Tooltip';
function MvpComments({Mvp,owner}) {
    const user = useSelector((state)=> state.user.users)
    const dispatch = useDispatch()
    console.log(Mvp);
    const [reply, setReply] = useState("")
    const [values, setValues] = useState({
        showPassword: false,
      });
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
   const comments = useSelector((state)=>state.post.mvpComments)
   console.log(comments);
    return (
        <div>
           {comments.map((e)=><>
           {e.solution_id === Mvp ?<div className="comments-card">
           <div className="head-mvp">
           
        <Avatar style={{marginTop:".2rem"}} src={e.user.user_profile}/>
<div className="user-name">
        <Link to={{pathname:'/userProfile',state:e.user}}  className="user-name-link">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/> </Link> <br/>
                   <div style={{color:"white",fontSize:"small"}}>{moment(e.createdAt).format("MMMD,YYYY")}</div>
                   </div>
           
                   {user._id === e.user._id || owner === user._id? <div style={{marginLeft:"8rem"}}>
        
            <DeleteRoundedIcon style={{cursor:"pointer"}} onClick={()=>dispatch(DeleteMvpCom(e._id))}/>
            
             </div>
             
             :<></>}
             </div>
             <div style={{marginTop:".5rem"}}>
             {e.comment_text}
             </div>
             <div className="footer">
               <div>
    <ThumbUpAltIcon style={{cursor:"pointer"}} className={e.up_vote.includes(user._id)? "l":""}
               onClick={()=>dispatch(MvpComUpVote(e._id,user._id))}
                  />
                  {e.up_vote.length > 0?e.up_vote.length:""}
                  </div>
                   
                <div style={{marginLeft:"1rem"}}>
                       <ThumbDownAltIcon style={{cursor:"pointer"}} className={e.down_vote.includes(user._id)? "l":""}
                          onClick={()=>dispatch(MvpComDownVote(e._id,user._id))}
                      />
                      {e.down_vote.length > 0?e.down_vote.length:""}
                      
                      </div>
                      <Tooltip title="Add Reply" arrow>
                      <div style={{marginLeft:"1rem"}}>
                           <BsReplyFill style={{fontSize:"30px",cursor:"pointer"}} 
                           onClick={handleClickShowPassword}
                           
                           />{e.replys.length > 0?e.replys.length:""}
                           </div>
                           </Tooltip>
                           </div> 
                           {values.showPassword === true? 
                <>
                <div>
                  {/* <br/> */}
                    <div>
                    <TextField
                style={{width:"100%"}}
                type="text"
           value={reply}
                placeholder="add reply"
                
                // variant="outlined"
                onChange={(e)=>setReply(e.target.value)}
                InputProps={{
                
                endAdornment:
                  <InputAdornment position="end">
                    
                    <SendRoundedIcon style={{cursor:"pointer"}} onClick={()=>{dispatch(AddMvpReply(user._id,e._id,reply));
                    setReply(" ")
                  }}/>
                    
                  </InputAdornment>
                }}
               
              />
                       
                        
                    </div>
                    <MvpReplys Mvp={e._id} owner={owner}/>
                </div>
                
                </>
                :<></>
}
                          
                
           </div>:<></>}
           </>)}
        </div>
    )
}

export default MvpComments

