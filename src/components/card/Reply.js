import { Avatar,IconButton, Snackbar } from '@material-ui/core'

import React from 'react'
import'./PostCard.css'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import moment from "moment"
import MuiAlert from '@material-ui/lab/Alert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShowMoreText from 'react-show-more-text';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { repDelete, repUpVote,repDownVote } from '../../redux/postActions';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
const useStyles = makeStyles((theme) => ({
  like:{
    color:"#0d47a1"
  },
  unlike:{
    color:"rgb(39, 39, 38)"
  },
}));
function Reply({comment,owner}) {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user.users)
console.log(user);
const Data = useSelector((state)=> state.post.replys)
console.log(user);
console.log(Data); 
const classes = useStyles();
    
console.log(Data);

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
         {comment === e.comment_id? <div className='replys-card' key={e._id}>
         
         <div className="head">
        <Avatar style={{marginTop:".2rem"}} src={e.user.user_profile}/>
<div className="user-name">
        <Link to={{pathname:'/userProfile',state:e.user}} style={{fontFamily: "lucida Sans"}} className="user-name-link">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/> </Link> <br/>
                   <div style={{color:"white",fontSize:"small",fontFamily:"lucida Sans"}}>{moment(e.createdAt).format("MMMD,YYYY")}</div>
                   </div>
           
          
          
         {user._id === e.user._id || owner === user._id ? <div style={{marginLeft:"18rem"}}>
        <IconButton>
            <DeleteRoundedIcon
             onClick={()=>
            dispatch(repDelete(e._id))
             
             }/>
             </IconButton>
             </div> :<></>}
        
          </div>
          {/* <br/> */}
          <div className="text" style={{color:"black",fontFamily: "lucida Sans",marginLeft:"1rem"}}>
          <ShowMoreText
               
               lines={1}
               more='Show more'
               less='Show less'
              
               expanded={false}
              
           >{e.reply_text}</ShowMoreText>
           
          </div>
            
           <div className='footer' style={{color:"black"}}>
           <div  style={{marginLeft:"1rem"}}>
             <ThumbUpAltIcon 
             className={e.up_vote.includes(user._id)? classes.like:classes.unlike}
             onClick={()=>{
                      handleClick({ vertical: 'bottom', horizontal: 'left' })
                      dispatch(repUpVote(e._id,user._id))
                }}/>{e.up_vote.length}  
                <Snackbar open={Open} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} autoHideDuration={1000} onClose={Close}>
          {e.up_vote.includes(user._id)?<Alert  severity="info">removed</Alert>
      :<Alert  severity="info">liked</Alert>}
        </Snackbar>
             </div>
            <div  style={{marginLeft:"1rem"}}>
                 <ThumbDownAltIcon 
                 className={e.down_vote.includes(user._id)? classes.like:classes.unlike}
                 onClick={()=>{
                       handle({ vertical: 'bottom', horizontal: 'left' })
                      dispatch(repDownVote(e._id,user._id))
                }}/>{e.down_vote.length} 
                <Snackbar open={open} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} autoHideDuration={1000} onClose={handleClose}>
          {e.down_vote.includes(user._id)?<Alert  severity="info">removed</Alert>
      :<Alert  severity="info">disliked</Alert>}
        </Snackbar> 
                 </div>
                 
              
           

           </div>
         
         </div>
         
         :console.log("")
        }
        </>
            )}  
               
       </>
    )
}

export default Reply
