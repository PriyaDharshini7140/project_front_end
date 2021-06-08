import { Avatar,Button,IconButton, Snackbar } from '@material-ui/core'
import { BsReply } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import'./PostCard.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RedoRoundedIcon from '@material-ui/icons/RedoRounded';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import { useSelector,useDispatch } from 'react-redux';
import ShowMoreText from 'react-show-more-text';
import {comUpVote,comDownVote, comDelete, AddReply} from '../../redux/postActions';
import { Link } from 'react-router-dom';
import Reply from './Reply';
import moment from "moment"
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  like:{
    color:"#00b0ff"
  }
}));
function Comment({post}) {
  const user = useSelector((state)=> state.user.users)
console.log(post);
const dispatch = useDispatch();
    const Data = useSelector((state)=>state.post.comments)
    const rep = useSelector((state)=>state.post.replys)
    // const [Open,setOpen] = useState(1);
    const [reply,setReply] = useState('');
    console.log(Data.map(e=>e._id));
    const [values, setValues] = useState({
      showPassword: false,
    });
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
console.log(Data);
console.log(rep);
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
         {post === e.post_id? <div className="card" key={e._id}>
         
          <h5 className='cardheader'>
            
            <Avatar alt={e.user.user_name} src={e.user.profile_picture}/> 
            <Link to={{pathname:'/userProfile',state:e.user}} className="nav-link">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/></Link> 
                   {moment(e.createdAt).format("MMMD,YYYY")}
           
          
          
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
             <ThumbUpAltIcon 
              className={e.up_vote.includes(user._id)? classes.like:""}
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
  
             </IconButton>
             
        
     
            <IconButton>
            
                 <ThumbDownAltIcon
                  className={e.down_vote.includes(user._id)? classes.like:""}
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
                 </IconButton>
            
                 <IconButton>
                 <BsReply  onClick={handleClickShowPassword}/>{e.replys.length}
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
              {values.showPassword ? 
              <><div className="re">
              <div className="r">
                  <input placeholder="add reply"   type="text" onChange={(e)=>setReply(e.target.value)}/>
                  <IconButton >
                  <SendRoundedIcon className='iconbutton' onClick={()=>
                 dispatch(AddReply(user._id,e._id,reply))} />
                  </IconButton>
              </div>
              </div><br/>
              <Reply comment={e._id}/></>
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
