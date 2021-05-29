import React, { useState } from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { Avatar, Card, IconButton, Input, InputAdornment, TextField, Tooltip, Typography} from '@material-ui/core'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Comment from './Comment';
import {UpVote,DownVote,DeletePost} from "../../redux/postActions"
import ShowMoreText from 'react-show-more-text';
import { Link,useHistory} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
  const classes = useStyles();
  console.log(colors);
  console.log(classes);
  const user = useSelector((state)=> state.user.users)
// console.log(user);
const auth = useSelector((state)=> state.user.authorization)
 console.log("search",a);
  console.log(auth);

// console.log(post);

const dispatch = useDispatch();
const [anchorEl, setAnchorEl] = React.useState(null);
    const [Open,setOpen] = useState(1);
    // const [Close,setClose] = useState(true);
    const [comment,setComment] = useState('');
   const color = false
   
  

  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
       
      };
   
      const handleClose = () => {
        setAnchorEl(null);
      };
     
        const [index, setIndex] = useState(0);
      
        const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };
    return (
        <div>
            <Card className='homepage__card' key={a._id}>
              
            <div class='homepage__card__header'>
       <AvatarUserDetails 
       title={
        // <React.Fragment>
           <div className='userProfile_card'>
            <div className='upper'>
          <Avatar alt={a.user.user_name} src={a.user.profile_picture} className={classes.large}/>
          
          <div className="upperPart">
            <div className='inner'>
            
            <div><PersonIcon/>{user.user_name}</div><br/>
            <div><EmailIcon/>{user.email_id}</div><br/>
            <div><WorkIcon/>{user.work === null ? <>not mentioned</>:user.work}</div><br/>
            <div><SchoolRoundedIcon/>{user.education === null ? <>not mentioned</>:user.education}</div><br/>
           

           
              
               </div>
    </div>
          
         
          </div>
          </div>
        // </React.Fragment>
      }
      placement="left-start">
       
          
               
                   <Avatar alt={a.user.user_name} src={a.user.profile_picture}/>
                   
                   </AvatarUserDetails>
                   <h4 class='homepage__card__header__avatar'>
                    <Link to={{pathname:'/userProfile',state:a.user}} className="nav-link">
                   {a.user.user_name}
                   <VerifiedUserRoundedIcon/>
                   </Link> 
                   </h4>
                   
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
        <ModalEdit post_id={a._id} post_text={a.post_text} onClick={()=> setAnchorEl(null)}/>
        
        <MenuItem onClick={()=>{ 
           setAnchorEl(null)
           if(window.confirm("Do you want to delete this post")){
           dispatch(DeletePost(a._id));
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
                   </>:<> 
                   <IconButton>
                       <MoreVertIcon onClick={handleClick}/>
                   </IconButton>
                   <Menu  id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
                   <MenuItem onClick={()=>{ alert("post is reported")
        setAnchorEl(null)
    }
    }>report</MenuItem>
    </Menu>
    </>}
                  
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
                 <div>
                 <ShowMoreText
                    className='text'
                lines={4}
                more='Show more'
                less='Show less'
               
                expanded={false}
               
            >{a.post_text}</ShowMoreText>
                 </div>
             <div>
               
                 <Carousel controls='false'>
                 {a.post_url.map(e=>
                 <Carousel.Item>

                 <img key={e}
                      className="d-block w-100"
                      style={{height:'100px'}}
                       src={e}
                       alt={a.user.user_name}
                     />
                     </Carousel.Item>
                      )}
                   </Carousel>
               
            
           
             </div>
            
              
              
               {auth.status === "Verified" ? <>
               <div className='footer'>
               <IconButton>
                   <ThumbUpAltOutlinedIcon onClick={()=>dispatch(UpVote(a._id,user._id))}/>{a.up_vote.length}
                   </IconButton> 
                 <IconButton>
                       <ThumbDownAltOutlinedIcon  onClick={()=>{
                           dispatch(DownVote(a._id,user._id))
                           }}/>{a.down_vote.length}
                       </IconButton> 
                       <IconButton>
                           <CommentOutlinedIcon  onClick={()=>{
                          const add = Open+1;
                           setOpen(add)
                           
                       }}/>{a.comments.length}
                       </IconButton>
                       
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
                    
                </div>
                </div>
                {Open % 2 === 0 ? 
                <Comment post={a._id}/>:<></>
}
</>:<></>}

</div> 
              
              </Card>
        </div>
    )
}

export default CardCom
