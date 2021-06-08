import { Avatar, Card, InputAdornment, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {mvpDisplay, mvpUpVote,mvpDownVote, DeleteMvp, AddMvpComment} from '../../redux/postActions'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { BsFillChatFill} from "react-icons/bs";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import moment from "moment"
import MvpComments from './MvpComments';
import LinkIcon from '@material-ui/icons/Link';
import { makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme,colors) => ({
  
    root: {
    borderRadius:"20px"
    },
    // large: {
    //   width: theme.spacing(18),
    //   height: theme.spacing(18),
    //   marginLeft:"30%",
    //   marginTop:"1%",
    // },
    // like:{
    //   color:"#00b0ff"
    // }
   input:{
    borderRadius:"20px",
    border:"black"
   }
  }));
function MvpCard({Mvp}) {
    const classes = useStyles();
    const Data = useSelector((state)=> state.post.mvp)
    const user = useSelector((state)=> state.user.users)
    const dispatch = useDispatch()
    console.log(Mvp);
    console.log(Data);
    const [values, setValues] = useState({
        showPassword: false,
      });
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      const [comment,setComment] = useState("")
    return (

<div>
{Data.map((e)=><div >
{Mvp === e.post_id ? <div className="card">
    <div className="header">
        <Avatar src={e.user.user_profile}/>
<div className="nav-link">
        <Link to={{pathname:'/userProfile',state:e.user}} >
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/> </Link> <br/>
                   {moment(e.createdAt).format("MMMD,YYYY")}
                   </div>
                   {user._id === e.user._id ? 
                   
                   <div>
                     
            <HighlightOffIcon onClick={()=>dispatch(DeleteMvp(e._id))}/>
            
             </div> :<></>}
    </div>
    <h2>{e.solution_title}</h2>
    <div>
    <LinkIcon/><a href={e.link} target="_blank" rel="noopener noreferrer">{e.link}</a>
    </div>
   
    <div >
    <ThumbUpAltIcon 
               onClick={()=>dispatch(mvpUpVote(e._id,e.user_id))}
                  />{e.up_vote.length > 0?e.up_vote.length:""}
                     
                   
                
                       <ThumbDownAltIcon 
                          onClick={()=>dispatch(mvpDownVote(e._id,e.user_id))}
                      />{e.down_vote.length > 0?e.down_vote.length:""}
                          
                       
                           <BsFillChatFill style={{fontSize:"large"}} 
                           onClick={handleClickShowPassword}
                           
                           />{e.comments.length > 0?e.comments.length:""}
                           {values.showPassword === true? 
                <>
                <div>
                    <div>
                    <TextField
                
                type="text"
             className={classes.input}
                placeholder="add comments"
                
                // variant="outlined"
                onChange={(e)=>setComment(e.target.value)}
                InputProps={{
                
                endAdornment:
                  <InputAdornment position="end">
                    
                    <SendRoundedIcon onClick={()=>dispatch(AddMvpComment(user._id,e._id,comment))}/>
                    
                  </InputAdornment>
                }}
               
              />
                       
                        
                    </div>
                    <MvpComments Mvp={e._id}/>
                </div><br/>
                
                </>
                :<></>
}
                           </div>     
                       
</div>:<></>}
</div>)}
</div>
    )
}

export default MvpCard
