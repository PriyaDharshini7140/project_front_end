import { Avatar, Card, IconButton} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Axios from 'axios'
import'./PostCard.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Comment from './Comment';
import AuthService from "../../auth/AuthService"
import Services from '../../services/Services'
import CardCom from './CardCom';
import { useSelector } from 'react-redux';
function PostAcc() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useSelector((state)=> state.user.users)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


  const handleComment =()=>{
    console.log("comments");
  }
       const [Data,setData] = useState([]);
        const [comment,setComment] = useState('');
        const [up_vote,setup_vote] = useState('0');
        const [down_vote,setdown_vote] = useState('0');

   

    const handleChange=()=>{
      <div className="upvote">

      </div>
      //  console.log("clicked");
    }
  
   
    useEffect(()=>{
      Axios.post('http://localhost:4000/user/UserProfile',{
          _id:user._id
      }).then(
        (res)=>setData(res.data),
       )
      },[user._id])

    return(<>
     {Data.map((e)=> <>
          {e.posts.length > 0 ? <>{e.posts.map((a)=>
          <CardCom e={e} a={a}/>
          )}</>
           : <>{console.log("no posts")}</>}
            </>)}
     </>
         )
}

export default PostAcc
