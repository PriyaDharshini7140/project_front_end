import { Avatar,IconButton, Snackbar,InputAdornment,Tooltip,TextField } from '@material-ui/core'
import { BsReplyFill } from "react-icons/bs";
import React, {  useState } from 'react'
import'./PostCard.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import { useSelector,useDispatch } from 'react-redux';
import ShowMoreText from 'react-show-more-text';
import {comUpVote,comDownVote, comDelete, AddReply} from '../../redux/postActions';
import { Link } from 'react-router-dom';
import Reply from './Reply';
import moment from "moment"
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  like:{
    color:"#0d47a1"
  },
  unlike:{
    color:"rgb(39, 39, 38)"
  },
}));
function Comment({post,owner}) {
  const user = useSelector((state)=> state.user.users)
// console.log(post);
const dispatch = useDispatch();
    const Data = useSelector((state)=>state.post.comments)
    // const rep = useSelector((state)=>state.post.replys)
    // const [Open,setOpen] = useState(1);
    const [reply,setReply] = useState('');
    // console.log(Data.map(e=>e._id));
    const [values, setValues] = useState({
      showPassword: false,
    });
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
// console.log(Data);
// console.log(rep);
// console.log(Open);
const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [Open, setopen] = React.useState(false);
  const handleClick = () => {
    setopen(true);
  };
  const handle = () => {
    setOpen(true);
  };
  const Close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen(false);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

    return (
       <>
       {Data.map((e)=>
        <>
         {post === e.post_id? <div className="comments-card" key={e._id}>
         
         
            
         <div className="head">
        <Avatar style={{marginTop:".2rem"}} src={e.user.user_profile}/>
<div className="user-name">
        <Link to={{pathname:'/userProfile',state:e.user}} className="user-name-link">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/> </Link> <br/>
                   <div style={{color:"white",fontSize:"small"}}>{moment(e.createdAt).format("MMMD,YYYY")}</div>
                   </div>
           
          
          
         {user._id === e.user._id || owner === user._id ? <div style={{marginTop:"-.5rem"}}> 
        <IconButton>
            <DeleteRoundedIcon onClick={()=>dispatch(comDelete(e._id))}/>
             </IconButton>
             </div> :<></>}
        
         </div>
          {/* <br/> */}
          <div className="text" style={{color:"black",marginLeft:"1rem"}}>
          <ShowMoreText
               
               lines={2}
               more='Show more'
               less='Show less'
              
               expanded={false}
              
           >{e.comment_text}</ShowMoreText>
           
          </div>
          
     
      
     
           <div className="footer" style={{color:"black"}}>
             
           <div  style={{marginLeft:"1rem"}}>
             <ThumbUpAltIcon style={{cursor:"pointer"}}
              className={e.up_vote.includes(user._id)? classes.like:classes.unlike}
             onClick={()=>{
                      handleClick({ vertical: 'bottom', horizontal: 'left' })
                      dispatch(comUpVote(e._id,user._id))
                }}/>  {e.up_vote.length}
                 <Snackbar open={Open} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} autoHideDuration={1000} onClose={Close}>
          {e.up_vote.includes(user._id)?<Alert  severity="info">removed</Alert>
      :<Alert  severity="info">liked</Alert>}
        </Snackbar>
  
        </div>
             
        
     
           
            <div  style={{marginLeft:"1rem"}}>
                 <ThumbDownAltIcon style={{cursor:"pointer"}}
                  className={e.down_vote.includes(user._id)? classes.like:classes.unlike}
                 onClick={()=>{
                       handle({ vertical: 'bottom', horizontal: 'left' })
                      dispatch(comDownVote(e._id,user._id))
                }}/> {e.down_vote.length}  
               <Snackbar open={open} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} autoHideDuration={1000} onClose={handleClose}>
          {e.down_vote.includes(user._id)?<Alert  severity="info">removed</Alert>
      :<Alert  severity="info">disliked</Alert>}
        </Snackbar>
        </div>
        <Tooltip title="Add Reply" arrow>
        <div  style={{marginLeft:"1rem"}}>
                 <BsReplyFill className={classes.unlike} style={{fontSize:"30px",cursor:"pointer"}}  onClick={handleClickShowPassword}/>{e.replys.length}
                 </div>
                 </Tooltip>
                 
              </div>
              {values.showPassword ? 
              <>
              <TextField
              style={{width:"100%"}}
                type="text"
             className={classes.input}
                placeholder="add reply"
                value={reply}
                // variant="outlined"
                onChange={(e)=>setReply(e.target.value)}
                InputProps={{
                
                endAdornment:
                  <InputAdornment position="end">
                    
                    <SendRoundedIcon style={{cursor:"pointer"}} onClick={()=>{dispatch(AddReply(user._id,e._id,reply))
                    setReply(" ")}
                      }/>
                    
                  </InputAdornment>
                }}
               
              />
             
              <Reply comment={e._id} owner={owner}/></>
           :<></>}

           
         
         </div>
         
         :console.log("")
        }
        </>
            )}  
            
       </>
    )
}

export default Comment
