import React, { useState } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { Avatar, Card, IconButton, Input, InputAdornment, Snackbar, TextField, Tooltip, Typography} from '@material-ui/core'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Comment from './Comment';
import {UpVote,DownVote,DeletePost} from "../../redux/postActions"
import ShowMoreText from 'react-show-more-text';
import {Link, useHistory} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import'./PostDetails.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import ModalEdit from '../modal/ModalEdit';
import { useSelector,useDispatch } from 'react-redux';
import {AddComment} from '../../redux/postActions'
import Chip from '@material-ui/core/Chip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Carousel from 'react-bootstrap/Carousel'
import MuiAlert from '@material-ui/lab/Alert';
import ModalReport from '../modal/ModalReport';
import LinkIcon from '@material-ui/icons/Link';
import MvpCard from './MvpCard';
import ModalMvp from '../modal/ModalMvp';

import moment from "moment"
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
    color:"#0d47a1"
  },
  menu:{
    backgroundColor:"rgba(10, 10,10,0.15)"
  }
 
}));
const AvatarUserDetails = withStyles((theme) => ({
  tooltip: {
  backgroundColor:"transparent",
    maxWidth:220,
   border: '20px',
  },
}))(Tooltip);

function Post(props) {
  const colors =['#e57373','#f06292','#64b5f6','#4dd0e1','#4db6ac','#dce775','#ffb74d','#fff176','#ff8a65','#90a4ae','#18ffff']
const history = useHistory()
  const classes = useStyles();
  const user = useSelector((state)=> state.user.users)
  const state = history.location.state
  console.log(state._id);
 
  console.log(classes);
  const [values, setValues] = useState({
        showPassword: false,
      });
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
  
// console.log(user);
const auth = useSelector((state)=> state.user.authorization)
const Data = useSelector((state)=> state.post.posts)
  console.log(values);
  const MVP = useSelector((state)=> state.post.mvp)
 console.log(MVP);
const filter = MVP && MVP.filter((e)=>e && e.user_id === user._id)
console.log(filter);
const presence =filter && filter.filter((e)=>e && e.post_id === state._id)
console.log(presence);
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
      <div className="boddy">
        {Data.map(a=>
        <>
        {a._id ===state._id ?<div className='col-xl-7 col-lg-7 col-7' >
          <div className='homepage__card' style={{height: "560px", direction: "ltr",
       background: "rgba(0, 0,0,0.15)",
       margin:"1rem",
      //  padding:"-10rem",
    overflow:"auto",
    borderRadius:"40px",
    
   }}  key={a._id}>
            
          <div className="head">
     
     
       
             
                 <Avatar style={{marginTop:".2rem"}} alt={a.user.user_name} src={a.user.profile_picture}/>
                 
                
                 <div className="user-name">
                  <Link to={{pathname:'/userProfile',state:a.user}}   className="user-name-link">
                <h5>{a.user.user_name} 
                 <VerifiedUserRoundedIcon className="verify"/></h5>
                 </Link> 
                 <div style={{color:"white",fontSize:"small"}}> {moment(a.createdAt).format("MMMD,YYYY")}</div>
                 </div>
                 <div style={{marginLeft:"25rem"}}>
                  {auth.status === "Verified" ? <>
                 <IconButton>
                     <MoreVertIcon onClick={handleClick}/>
                 </IconButton>
                 <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      className={classes.menu}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
     {user._id === a.user_id ? <>
      <ModalEdit post={a} onClick={()=> setAnchorEl(null)}/>
      
      <MenuItem onClick={()=>{ 
         setAnchorEl(null)
         if(window.confirm("Do you want to delete this post")){
         dispatch(DeletePost(a._id));
         history.push("/home page")
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
                 
            
             
             
             <div class="post" style={{color:'black'}} key={a._id}>
               <div>
              {
              
              a.category.map((c)=>
                <Chip key={c} label={c} size="small" style={{backgroundColor:colors[Math.floor(Math.random() * 12)],marginRight:".3rem"}}
                onClick={()=>history.push("/search_by_category",c)}
                
                />
              )
              }
           

             </div>
             <br/>

             <b>IdeaTitle:<Chip size="small" style={{backgroundColor:'lightblue',marginLeft:".3rem"}} label={a.idea_title}/></b>
             <br/>
               <div>
               <div
                 style={{textAlign:"justify"}} ><b>Description:</b>{a.post_text}</div>
               </div><br/>
               <div>
               {a.scope?<><b>Scope:</b>{a.scope}</>:<></>}</div>
               <div><br/>
               {a.enhancement?<><b >Enhancement to be done:</b>{a.enhancement}</>:<></>}
               </div><br/>
              
           
            {a.requirements.frontend ?<div>FrontEnd:{a.requirements.frontend.map(e=><Chip label={e} size="small" 
            style={{backgroundColor:colors[Math.floor(Math.random() * 12)],marginRight:".3rem"}}
            onClick={()=>history.push("/search_by_category",e)}
            />)}</div>:<></>}
            
            {a.requirements.backend ?<div>BackEnd:{a.requirements.backend.map(e=><Chip label={e} size="small" 
            style={{backgroundColor:colors[Math.floor(Math.random() * 12)],marginRight:".3rem"}}
            onClick={()=>history.push("/search_by_category",e)}
            />)}</div>:<></>}
            {a.requirements.database ?<div>DataBase:{a.requirements.database.map(e=><Chip label={e} size="small" 
            style={{backgroundColor:colors[Math.floor(Math.random() * 12)],marginRight:".3rem"}}
            onClick={()=>history.push("/search_by_category",e)}
            />)}</div>:<></>}
             <div className="text">
            {a.link?<><LinkIcon/> <a href={a.link} className="li" style={{color:"lightblue"}} target="_blank" rel="noopener noreferrer">{a.link}</a></>:<></>} 
             </div>
           <div>
             {a.post_url.length > 0 ?<Carousel controls='false'>
               {a.post_url.map(e=>
               <Carousel.Item>

               <img key={e}
                    className="d-block w-100"
                    style={{height:'90px'}}
                     src={e}
                     alt={a.user.user_name}
                   />
                   </Carousel.Item>
                    )}
                 </Carousel>:<></>}
               
             
          
         
           </div>
          
            
            
             {auth.status === "Verified" ? <>
             <div className='footer'>
             <IconButton>
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
                 </IconButton> 
               <IconButton>
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
                     </IconButton> 
                     <Tooltip title="Add Comment" arrow>
                     <IconButton>
                     
                         <CommentOutlinedIcon onClick={handleClickShowPassword}/>{a.comments.length}
                        
                     </IconButton>
                     </Tooltip>
                     <div style={{marginTop:".8rem"}}>{presence.length > 0 ?<></>:<ModalMvp post={a}/>}</div>
                    
                     
              </div>
              {values.showPassword === true? 
              <>
               <TextField
                
                type="text"
             className={classes.input}
                placeholder="add comments"
                
                // variant="outlined"
                onChange={(e)=>setComment(e.target.value)}
                InputProps={{
                
                endAdornment:
                  <InputAdornment position="end">
                    
                    <SendRoundedIcon style={{cursor:"pointer"}} onClick={()=>{dispatch(AddComment(user._id,a._id,comment))
                    setComment("")}
                      }/>
                    
                  </InputAdornment>
                }}
               
              />
             
              <Comment post={a._id}/></>
              :<></>
}

</>:<></>}

</div> 
            
            </div><br/>
            
      </div>:<></> }
          
      </>
          )}
        
        {presence.length > 0 ?
        <div className="col-xl-4 col-lg-4 col-4" 
      
        style={{ direction: "ltr",
       background: "rgba(0, 0,0,0.15)",
       margin:"1rem",
      //  padding:"-10rem",
    overflow:"auto",
    borderRadius:"40px",
    height: "560px",
    width: "50px"
    }}>
        <MvpCard Mvp={state._id}/>
        </div>:<></>}
        </div>
    )
}

export default Post
