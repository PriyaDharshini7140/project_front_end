import { Avatar, IconButton, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Account.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import CardCom from '../../components/card/CardCom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import WorkIcon from '@material-ui/icons/Work';
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    alignSelf:'center'
    },
    input: {
      display: 'none',
    },
    camera:{
      color:"#00B7FF",
     position:'absolute'
    },
  
  }));

function Account() {
  const user = useSelector((state)=> state.user.users)
  const auth = useSelector((state)=> state.user.authorization)
  console.log(user);
  const dispatch = useDispatch();
   const history = useHistory();
  console.log(history);
  const Data = useSelector((state)=> state.post.posts)
console.log(Data.map(e=>e.user_id));
const classes = useStyles()
    return (
      <div>
      <div>
      <div className='user'>
        <div className='user_inner'>
          <div className='user_inner_details'>
          <Avatar alt={user.user_name} src={user.profile_picture} className={classes.large}/>
          <div className='user_inner_details_avatars'><PersonIcon/> {user.user_name}{auth.status === "Verified" ? 
         <VerifiedUserRoundedIcon className='verify'/>:<></>}</div>
          
          <div className='user_inner_details_avatars'>  <EmailIcon/>  {user.email_id}</div>
        
          <div className='user_inner_details_avatars'><PhoneIcon/> {!user.phone_number ? <>not mentioned</>:user.phone_number}</div>
          
          <div className='user_inner_details_avatars'><WorkIcon/> {!user.work ? <>not mentioned</>:user.work}</div>
           
           <div className='user_inner_details_avatars'><SchoolRoundedIcon/> {!user.education ? <>not mentioned</>:user.education}</div>
           
           <div className='user_inner_details_avatars'><DescriptionRoundedIcon/> {!user.description ? <>not mentioned</>:user.description}</div>
           
         
          </div>
            
      </div>
       </div>
       <div className='posts'>
          {Data.map((e)=> <>{
           user._id === e.user_id ? <CardCom  a={e}/>:
        <></>
          }
           </>)}
           </div>
     
        </div>
        <footer class="c-footer">
          <div class="c-inner">
            Copyright IdeaWrapper. All rights reserved. For internal use only.
          </div>
        </footer>
        </div>
    )
}

export default Account
