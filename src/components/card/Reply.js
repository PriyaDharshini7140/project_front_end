import { Avatar,IconButton } from '@material-ui/core'

import React from 'react'
import'./PostCard.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ShowMoreText from 'react-show-more-text';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { repDelete, repUpVote,repDownVote } from '../../redux/postActions';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
function Reply({comment}) {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user.users)
console.log(user);
const Data = useSelector((state)=> state.post.replys)
console.log(user);
console.log(Data); 
  
    
console.log(Data);



    return (
       <>
       
       {Data.map((e)=>
        <>
         {comment === e.comment_id? <div className='rep' key={e._id}>
         
          <h5 className='cardheader'>
            
            <Avatar alt={e.user.user_name} src={e.user.profile_picture}/> 
         <Link to={{pathname:'/userProfile',state:e.user_id}} className="links">
                   {e.user.user_name}<VerifiedUserRoundedIcon className='verify'/></Link>
         
           
          
          
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
             <ThumbUpAltOutlinedIcon  onClick={()=>{
                      
                      dispatch(repUpVote(e._id,user._id))
                }}/>{e.up_vote.length}  
             </IconButton>
            <IconButton>
                 <ThumbDownAltOutlinedIcon onClick={()=>{
                      
                      dispatch(repDownVote(e._id,user._id))
                }}/>{e.down_vote.length}  
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
