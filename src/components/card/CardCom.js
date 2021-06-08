import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { Avatar, Button, Card, IconButton, Input, InputAdornment, Snackbar, TextField, Tooltip, Typography} from '@material-ui/core'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Comment from './Comment';
import {UpVote,DownVote,DeletePost} from "../../redux/postActions"
import ShowMoreText from 'react-show-more-text';
import {Link, useHistory, useLocation} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BsFillChatFill} from "react-icons/bs";

import'./PostCard.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import ModalEdit from '../modal/ModalEdit';
import { useSelector,useDispatch } from 'react-redux';
import {AddComment} from '../../redux/postActions'
import Chip from '@material-ui/core/Chip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkIcon from '@material-ui/icons/Work';
import Carousel from 'react-bootstrap/Carousel'
import MuiAlert from '@material-ui/lab/Alert';
import ModalReport from '../modal/ModalReport';
import moment from "moment"
import LinkIcon from '@material-ui/icons/Link';
import ModalMvp from '../modal/ModalMvp';
import MvpCard from './MvpCard';
// import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme,colors) => ({
  
  root: {
   backgroundColor:colors,
   color:"white"
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    marginLeft:"30%",
    marginTop:"1%",
  },
  like:{
    color:"#00b0ff"
  }
 
}));
const AvatarUserDetails = withStyles((theme) => ({
  tooltip: {
  backgroundColor:"transparent",
    maxWidth:220,
   border: '20px',
  },
}))(Tooltip);

function CardCom({a}) {
  const colors =['#e57373','#f06292','#64b5f6','#4dd0e1','#4db6ac','#dce775','#ffb74d','#fff176','#ff8a65','#90a4ae','#18ffff']
const history = useHistory()
const location = useLocation()
  const classes = useStyles();
  console.log(colors);
  console.log(a);
  const [values, setValues] = useState({
        showPassword: false,
      });
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
  const user = useSelector((state)=> state.user.users)
// console.log(user);
const auth = useSelector((state)=> state.user.authorization)
 console.log("search",a);
  console.log(values);
  const mvp = useSelector((state)=>state.post.mvp)
  console.log(mvp);

 

const dispatch = useDispatch();
const [anchorEl, setAnchorEl] = React.useState(null);
   
    
    const [comment,setComment] = useState('');
   
    const [open, setOpen] = React.useState(false);
    const [Open, setopen] = React.useState(false);
    const handleOpen = () => {
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
    const handleclose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
       
      };
   
      const handleClose = () => {
        setAnchorEl(null);
      };
     
        
    return (
        <div>
            <Card className='homepage__card' style={{borderRadius:"50px"}} key={a._id}>
              
            <div class='homepage__card__header'>
       <AvatarUserDetails 
       title={
       
           <div className='userProfile_card'>
            <div className='upper'>
          <Avatar alt={a.user.user_name} src={a.user.profile_picture} className={classes.large}/>
          
          <div className="upperPart">
            <div className='inner'>
            
            <div><PersonIcon/>{a.user.user_name}</div><br/>
            <div><EmailIcon/>{a.user.email_id}</div><br/>
            <div><WorkIcon/>{a.user.work === null ? <>not mentioned</>:a.user.work}</div><br/>
            <div><SchoolRoundedIcon/>{a.user.education === null ? <>not mentioned</>:a.user.education}</div><br/>
           

           
              
               </div>
    </div>
          
         
          </div>
          </div>
        // </React.Fragment>
      }
      placement="left-start">
       
         
               
                   <Avatar alt={a.user.user_name} src={a.user.profile_picture}/>
                   
                   </AvatarUserDetails>
                   <div className="n">
                    <Link to={{pathname:'/userProfile',state:a.user}}  style={{color:"white"}}>
                   {a.user.user_name}
                   <VerifiedUserRoundedIcon/>
                   </Link> 
                   {moment(a.createdAt).format("MMMD,YYYY")}
                   </div>
                   <div>
                    {auth.status === "Verified" ? <>
                   <IconButton>
                       <MoreVertIcon onClick={handleClick}/>
                   </IconButton>
                   <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       {user._id === a.user_id ? <>
        <ModalEdit post={a} onClick={()=> setAnchorEl(null)}/>
        
        <MenuItem onClick={()=>{ 
           setAnchorEl(null)
           if(window.confirm("Do you want to delete this post")){
           dispatch(DeletePost(a._id));
           }
           }
    }>delete</MenuItem>
       </>
       :
       <ModalReport postId={a._id}/>
    
      }
      
      </Menu>
                   </>:<> 
                   <IconButton>
                       <MoreVertIcon onClick={handleClick}/>
                   </IconButton>
                   <Menu  id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
                   <ModalReport postId={a._id}/>
    </Menu>
    </>}
    </div>          
             
                   </div>
                   
              
               
               
               <div class="post" key={a._id}>
                 <div>
                {
                
                a.category.map((c)=>
                  <Chip key={c} label={c} size="small" style={{backgroundColor:colors[Math.floor(Math.random() * 12)]}}
                  onClick={()=>history.push("/search_by_category",c)}
                  
                  />
                )
                }
             

               </div>
               <br/>

               <b>IdeaTitle:<Chip size="small" style={{backgroundColor:'lightblue'}} label={a.idea_title}/></b>
               <br/>
                 <div>
                 <div
                    className='text'><b>Description:</b>{a.post_text}<Link to={{pathname:'/postDetails',state:a}} >...more</Link></div>
                 </div><br/>
               
               
              
              
               {auth.status === "Verified" ? <>
               <div className='footer'>
               
                   <ThumbUpAltIcon 
                   className={a.up_vote.includes(user._id)? classes.like:""}
                  onClick={()=>{
                    
                     handleOpen({ vertical: 'bottom', horizontal: 'left' })
                     dispatch(UpVote(a._id,user._id))
                    
                     }}/>{a.up_vote.length}
                     <Snackbar open={Open} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} autoHideDuration={1000} onClose={Close}>
          {a.up_vote.includes(user._id)?<Alert  severity="info">removed</Alert>
      :<Alert  severity="info">liked</Alert>}
        </Snackbar>
                   
                
                       <ThumbDownAltIcon 
                       
                       className={a.down_vote.includes(user._id)? classes.like:""}onClick={()=>{
                          handle({ vertical: 'bottom', horizontal: 'left' })
                           dispatch(DownVote(a._id,user._id))
                           }}/>{a.down_vote.length}
                           <Snackbar open={open} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} autoHideDuration={1000} onClose={handleclose}>
          {a.down_vote.includes(user._id)?<Alert  severity="info">removed</Alert>
      :<Alert  severity="info">disliked</Alert>}
        </Snackbar>
                       
                           <BsFillChatFill style={{fontSize:"large"}} onClick={handleClickShowPassword}/>{a.comments.length}
                           
                       
                </div>
                {values.showPassword === true? 
                <>
                <div className="comments">
                    <div className="commentspost">
                        <input placeholder="add comment"   type="text" onChange={(e)=>setComment(e.target.value)}/>
                        <IconButton>
                        <SendRoundedIcon onClick={()=>{
                          
                        dispatch(AddComment(user._id,a._id,comment));
                        setComment(" ");
                        }
                        }/>
                        </IconButton>
                    </div>
                    
                </div><br/>
                <Comment post={a._id}/></>
                :<></>
}
</>:<></>}

</div> 
              
              </Card><br/>
              
        </div>
    )
}

export default CardCom
