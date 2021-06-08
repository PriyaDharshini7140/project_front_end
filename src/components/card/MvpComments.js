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
function MvpComments({Mvp}) {
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
           {e.solution_id === Mvp ?<>
           <div className="header">
           <div className="nav-link">
            <Avatar alt={e.user.user_name} src={e.user.profile_picture}/> 
            <Link to={{pathname:'/userProfile',state:e.user}} >
                   {e.user.user_name}<VerifiedUserRoundedIcon/></Link> 
                   {moment(e.createdAt).format("MMMD,YYYY")}
                   </div>
                   {user._id === e.user._id ? <div>
        
            <HighlightOffIcon onClick={()=>dispatch(DeleteMvpCom(e._id))}/>
            
             </div>
             
             :<></>}
             </div>
             {e.comment_text}
             <div>
    <ThumbUpAltIcon 
               onClick={()=>dispatch(MvpComUpVote(e._id,e.user_id))}
                  />
                  {e.up_vote.length > 0?e.up_vote.length:""}
                     
                   
                
                       <ThumbDownAltIcon 
                          onClick={()=>dispatch(MvpComDownVote(e._id,e.user_id))}
                      />
                      {e.down_vote.length > 0?e.down_vote.length:""}
                          
                       
                           <BsReplyFill style={{fontSize:"30px"}} 
                           onClick={handleClickShowPassword}
                           
                           />{e.replys.length > 0?e.replys.length:""}
                           {values.showPassword === true? 
                <>
                <div>
                    <div>
                    <TextField
                
                type="text"
           
                placeholder="add reply"
                
                // variant="outlined"
                onChange={(e)=>setReply(e.target.value)}
                InputProps={{
                
                endAdornment:
                  <InputAdornment position="end">
                    
                    <SendRoundedIcon onClick={()=>dispatch(AddMvpReply(user._id,e._id,reply))}/>
                    
                  </InputAdornment>
                }}
               
              />
                       
                        
                    </div>
                    <MvpReplys Mvp={e._id}/>
                </div>
                
                </>
                :<></>
}
                    </div>       
                
           </>:<></>}
           </>)}
        </div>
    )
}

export default MvpComments

