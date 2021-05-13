import React, { useState } from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { Avatar, Card, IconButton} from '@material-ui/core'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Comment from './Comment';
import AuthService from "../../auth/AuthService"
import Services from "../../services/Services"
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import'./PostCard.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ModalEdit from '../modal/ModalEdit';
import { useSelector } from 'react-redux';

function CardCom({a}) {
  const user = useSelector((state)=> state.user.users)
console.log(user);
const [anchorEl, setAnchorEl] = React.useState(null);
    const [Open,setOpen] = useState(1);
    // const [Close,setClose] = useState(true);
    const [comment,setComment] = useState('');
    const [up_vote,setup_vote] = useState(0);
    const [down_vote,setdown_vote] = useState(0);
    const [open, setopen] = React.useState(false);
   
  const handleClickOpen = (a,b) => {
    setopen(true);
    Services.editPost(a,b);
    setAnchorEl(null)
  };
  

  const handle = () => {
    setopen(false);
  };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
       
      };
   
      const handleClose = () => {
        setAnchorEl(null);
      };
      // const handleEdit =(a,b)=>{
     
        
      // }
    return (
        <div>
            <Card className='homepage__card' key={a._id}>
              
              <div className="homepage__card__header">
     
                   <Avatar alt={a.user_name} src={a.profile_picture} className="homepage__card__header__avatar" />
                 
                   <div className="homepage__card__body">
                    <Link to={{pathname:'/userProfile',state:a.user_id}} className="nav-links">
                   {a.user_name}</Link> 
                 
                   <div className="category">
                  -Category{a.category}</div>
                   </div>
                   
                   <div className="homepage__card__headerRight">
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
        <ModalEdit post_id={a._id} post_text={a.post_text} onClick={()=> setAnchorEl(null)}/>
        
        <MenuItem onClick={()=>{ 
           setAnchorEl(null)
           if(window.confirm("Do you want to delete this post")){
            Services.handleDelete(a._id);
           }
           }
    }>delete</MenuItem>
       </>
       :
       <MenuItem onClick={()=>{ alert("post is reported")
        setAnchorEl(null)
    }
    }>report</MenuItem>
      }
      
      </Menu>
                   </div>
               </div>
               
               <div className="post" key={a._id}>
                 <div className='text'>
                 {a.post_text}
                 </div>
             <div>
             <img key={a._id} className="image" alt="" src={a.post_url}/>
             </div>
            
               </div>
               <div className="card_body">
               <IconButton>
                   <ThumbUpAltOutlinedIcon onClick={()=>{
                        
                         Services.editUpVotes(a._id,user._id)
                   }}/>  
                   </IconButton>{a.up_vote.length}
                  <IconButton>
                       <ThumbDownAltOutlinedIcon onClick={()=>{
                            Services.editDownVotes(a._id,user._id)
                           }}/>  
                       </IconButton>{a.down_vote.length} 
                       <IconButton>
                           <CommentOutlinedIcon onClick={()=>{
                        //   console.log(Open+1);
                          const add = Open+1;
                           setOpen(add)
                       }}/>
                       </IconButton>
                       <div className="comments">
                    <div className="commentspost">
                        <input placeholder="add comment"   type="text" onChange={(e)=>setComment(e.target.value)}/>
                        <IconButton>
                        <SendRoundedIcon onClick={()=>
                        Services.addComment(user._id,user.user_name,a._id,comment)}/>
                        </IconButton>
                    </div>
                   
                </div>
                {Open % 2 === 0 ? 
               <Comment post={a._id} e={a.user_id}/> :
               <></>
               
            }
              
               </div>
              
              </Card>
        </div>
    )
}

export default CardCom
