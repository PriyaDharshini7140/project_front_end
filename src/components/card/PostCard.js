import { Avatar, Card, IconButton, Modal } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Axios from 'axios'
import'./PostCard.css'


const comment=()=>{
      console.log("comments");
    // <div className="chat__footer">
    
    <form>
        <input placeholder="add a comment" type="text"/>
        <button>send a message</button>
    </form>
    // </div>

}




function PostCard() {
  
    const [Data,setData] = useState([]);
    useEffect(()=>{
      Axios.post('http://localhost:4000/user/newFeed/').then(
        (res)=>setData(res.data)
       )
      },[])
     
    //  console.log(Data);

  
   


    return (
     <>
     {Data.map((e)=> <>
          {e.posts.length > 0 ? <Card className='homepage__card'>
              
          <div className="homepage__card__header">
 
               <Avatar alt={e.user_name} src="/static/images/avatar/1.jpg" className="homepage__card__header__avatar" />
               <div className="homepage__card__body">
               {e.user_name}
               </div>
               
               <div className="homepage__card__headerRight">
               <IconButton>
               <PersonAddOutlinedIcon/>
               </IconButton>
                   <IconButton>
                       <MoreVertIcon/>
                   </IconButton>
               </div>
           </div>
           
           <div className="post">
         {e.posts.map(a=> a.post_text )}
         {/* {e.posts.map(a=> a.post_url )} */}
           </div>
           <div className="card_body">
           <IconButton>
               <ThumbUpAltOutlinedIcon/>  
               </IconButton>{e.posts.map(a=> a.up_vote)}
              <IconButton>
                   <ThumbDownAltOutlinedIcon/>  
                   </IconButton>{e.posts.map(a=> a.down_vote)} 
                   <IconButton>
                       <CommentOutlinedIcon/>
                   </IconButton>
           </div>
          
          </Card> : <>{console.log("no posts")}</>}
           
          </>
     
           
     
        )}
     </>
           
          
       
    )
}

export default PostCard
