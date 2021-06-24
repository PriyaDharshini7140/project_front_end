import { Avatar,  IconButton, InputAdornment, Menu, MenuItem, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { mvpUpVote,mvpDownVote, DeleteMvp, AddMvpComment, mvpSelected} from '../../redux/postActions'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHandsHelping } from "react-icons/fa";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { BsFillChatFill} from "react-icons/bs";
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import moment from "moment"
import MvpComments from './MvpComments';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles} from '@material-ui/core/styles';
import ModalMvpEdit from '../modal/ModalMvpEdit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Button from '@material-ui/core/Button';

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
    like:{
      color:"#0d47a1"
    },
    unlike:{
      color:"rgb(39, 39, 38)"
    },
   input:{
    // borderRadius:"20px",
    border:"black",
    width:"100%"
   },pink: {
    color: theme.palette.getContrastText("#1769aa"),
    backgroundColor: "#1769aa",
    marginLeft:".5rem",
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  }));
function MvpCard({Mvp,owner}) {
    const classes = useStyles();
    const Data = useSelector((state)=> state.post.mvp)
    const select = Data && Data.filter((e)=>e && e.post_id === Mvp)
    console.log(select);
    const selected = select && select.filter((e)=>e && e.selected === true)
    console.log(selected);
    const user = useSelector((state)=> state.user.users)
    const auth = useSelector((state)=> state.user.authorization)
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
      const [anchorEl, setAnchorEl] = React.useState(null);
   
     
   
   
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
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
     
    };
 
    const handleClose = () => {
      setAnchorEl(null);
    };
   
    return (

<div>
{Data.map((e)=><>
{Mvp === e.post_id ? <div className="mvp-card"  >
    <div className="head-mvp">
        <Avatar style={{marginTop:".2rem"}} src={e.user.profile_picture}/>
<div className="user-name">
        <Link to={{pathname:'/userProfile',state:e.user}}  className="user-name-link">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/> </Link> <br/>
                   <div style={{color:"white",fontSize:"small"}}>{moment(e.createdAt).format("MMMD,YYYY")}</div>
                   </div>
                   
                   
                   {user._id === e.user_id ? 
                   
                  
                        <div style={{marginLeft:"3rem"}}>

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
     {user._id === e.user_id ? <>
      <ModalMvpEdit post={e} onClick={()=> setAnchorEl(null)}/>
      
      <MenuItem onClick={()=>dispatch(DeleteMvp(e._id))}>delete</MenuItem>
     </>
     :
     <></>
  
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
                 <></>
  </Menu>
  </>}
  </div>     
       
            
             :<></>}
    </div>
    <div style={{display:'flex',flexDirection:"row"}}>
    <h6 style={{color:"rgb(37, 37, 36)",marginTop:".5rem"}}>{e.solution_title}
    <a href={e.link}>
     <Tooltip title="Download Zip File" arrow>
     <Avatar className={classes.pink} size='small'>
    <GetAppRoundedIcon variant="contained"/>
      </Avatar>
</Tooltip> </a>  
     </h6>
        
    </div>
    
   
   
    {auth.status === "Verified" ? <> 
    <div className="footer">
    <div><ThumbUpAltIcon className={e.up_vote.includes(user._id)? classes.like:classes.unlike}
             style={{cursor:"pointer"}}  onClick={()=>dispatch(mvpUpVote(e._id,user._id))}
                  />
                     {e.up_vote.length > 0?e.up_vote.length:""}
                   
                     </div>
                     <div  style={{marginLeft:"1rem"}}>
                       <ThumbDownAltIcon className={e.down_vote.includes(user._id)? classes.like:classes.unlike}
                         style={{cursor:"pointer"}} onClick={()=>dispatch(mvpDownVote(e._id,user._id))}
                      />{e.down_vote.length> 0?e.down_vote.length:""}
                          </div>
                          <Tooltip title="Add Comment" arrow>
                       <div  style={{marginLeft:"1rem"}}>
                      
                           <BsFillChatFill key={e._id} style={{fontSize:"large",cursor:"pointer"}} 
                           onClick={handleClickShowPassword}
                           className={classes.unlike}
                           />{e.comments.length > 0?e.comments.length:""}
                           
                           </div>
                           </Tooltip>
                           <Tooltip title="click to select mvp" arrow>
                             {owner === user._id ?
                             <div>
                               
                             {selected.length > 0  ? e.selected === true ? 
                   
                   <FaHandsHelping onClick={()=>dispatch(mvpSelected(e._id))}  style={{color:"#ffeb3b",cursor:"pointer",fontSize:"30px",marginLeft:"1rem"}}/>:<></>:<FaHandsHelping  onClick={()=>dispatch(mvpSelected(e._id))} style={{color:"white",cursor:"pointer",fontSize:"30px",marginLeft:"1rem"}}/>}
                  
                          
                   </div>:<></>}
                    </Tooltip>
                    <Tooltip title="Selected Mvp" arrow>
                             <div>
                           {selected.length > 0 && owner !== user._id ? e.selected === true ? 
                   
                   <FaHandsHelping   style={{color:"#ffeb3b",cursor:"pointer",fontSize:"30px",marginLeft:"1rem"}}/>:<></>:<></>}
                   </div>
                    </Tooltip>  
                  
                           </div>
                          <br/>
                           {values.showPassword === true? 
                <>
                
                    <div>
                    <TextField
                
                type="text"
             className={classes.input}
                placeholder="add comments"
                value={comment}
                // variant="outlined"
                onChange={(e)=>setComment(e.target.value)}
                InputProps={{
                
                endAdornment:
                  <InputAdornment position="end">
                    
                    <SendRoundedIcon style={{cursor:"pointer"}} onClick={()=>{dispatch(AddMvpComment(user._id,e._id,comment));
                      setComment(" ")}}/>
                    
                  </InputAdornment>
                }}
               
              />
                       
                        
                    </div>
                    <div>
                    <MvpComments Mvp={e._id} owner={owner}/>
                </div><br/>
                
                </>
                :''
}</>:<></>}
   
                         
                       
</div>:<></>}
</>)}
</div>
    )
}

export default MvpCard
