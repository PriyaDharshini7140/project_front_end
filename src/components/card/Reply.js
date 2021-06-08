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
const useStyles = makeStyles((theme) => ({
  like:{
    color:"#00b0ff"
  }
}));
function Reply({comment}) {
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
         {comment === e.comment_id? <div className='rep' key={e._id}>
         
          <h5 className='cardheader'>
            
            <Avatar alt={e.user.user_name} src={e.user.profile_picture}/> 
         <Link to={{pathname:'/userProfile',state:e.user}} className="links">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/></Link>
                   {moment(e.createdAt).format("MMMD,YYYY")}
           
          
          
         {user._id === e.user._id ? <div>
        <IconButton>
            <HighlightOffIcon
             onClick={()=>
            dispatch(repDelete(e._id))
             
             }/>
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
              
           >{e.reply_text}</ShowMoreText>
           
          </div>
            
           <div className='footerrep'>
           <IconButton>
             <ThumbUpAltIcon 
             className={e.up_vote.includes(user._id)? classes.like:""}
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
             </IconButton>
            <IconButton>
                 <ThumbDownAltIcon 
                 className={e.down_vote.includes(user._id)? classes.like:""}
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
                 </IconButton>
                 
              
           

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
