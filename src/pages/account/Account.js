import { Avatar, Card, IconButton, makeStyles } from '@material-ui/core'
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
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import ModalProfile from '../../components/modal/ModalProfile';
import Badge from '@material-ui/core/Badge';

import {Link} from 'react-router-dom';

// import './Home.css'
import moment from 'moment';


import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      
      //  marginLeft:"-800px",
     
    },
    input: {
      display: 'none',
    },
    camera:{
      color:"#00B7FF",
     position:'absolute'
    },
  l:{
    // marginTop:"-10px",
    marginLeft:"50px",
   fontSize:"40px"
  }
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
      <div className='wrapper-Acc' style={{color:"white"}}>
      <div>
      {/* <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={}
      > */}
      <center>
        <Avatar style={{marginTop:"1rem"}} alt={user.user_name} src={user.profile_picture} className={classes.large}/>
        </center>
      {/* </Badge> */}
      
        
       </div>
       <div style={{marginTop:"1.5rem",marginLeft:"-4rem"}}>
       <h3> 
          <div><PersonIcon/> {user.user_name}{auth.status === "Verified" ? 
         <VerifiedUserRoundedIcon className='verify'/>:<></>}</div></h3>
          <div> <EmailIcon style={{marginRight:".3rem"}}/>{user.email_id}</div>
          <div>{!user.phone_number ? <></>:<><PhoneAndroidRoundedIcon style={{marginRight:".3rem"}}/>{user.phone_number}</>}</div>
        <div>{!user.work ? <></>:<><WorkIcon style={{marginRight:".3rem"}}/>{user.work}</>}</div>
        <div>{!user.education ? <></>:<><SchoolRoundedIcon style={{marginRight:".3rem"}}/>{user.education}</>}</div>
        
      
      </div>
      <div>
         <div style={{display:"flex",justifyContent:"flex-end",marginRight:"-4rem",marginTop:".5rem"}}><ModalProfile/></div>
       
        <p style={{textAlign:"justify",width:"400px",marginTop:"-1rem"}}>
        <b style={{marginRight:".3rem"}}>{user.description ?<>About:</>:<></> }</b>
          {user.description}
        </p></div>
    </div><br/>
    <div className="wrapper-account"> 
    {Data.map((a)=> <>{
           user._id === a.user_id ?<><div className='homepage__card'  key={a._id} onClick={()=>{
            history.push({pathname:"/postDetails",state:a})
          }}>
            
          <div className="head">
    
<Avatar alt={a.user.user_name} src={a.user.profile_picture}/>
                 
                 
                 <div className="user-name">
                  <Link to={{pathname:'/userProfile',state:a.user}} style={{fontFamily: "lucida Sans"}} className="user-name-link">
                 {a.user.user_name}
                 <VerifiedUserRoundedIcon className="verify"/>
                 </Link> 
                 <div style={{color:"white",fontSize:"small",fontFamily: "lucida Sans"}}>{moment(a.createdAt).format("MMMD,YYYY")}</div>
                 </div>
                
                 </div> <div class="post" key={a._id}>
               <div>
              {
              
              a.category.map((c)=>
                <Chip key={c} label={c} variant="outlined" size="small" style={{color:"white",borderColor:'lightgrey',fontFamily: "lucida Sans"}}
                onClick={()=>history.push("/search_by_category",c)}
                
                />
              )
              }
           

             </div>
            
<br/>

             <h4 style={{color:'white',fontFamily: "lucida Sans"}}>{a.idea_title}</h4>
  
               <div>
               <div
                  className='text' style={{color:'white',fontFamily: "lucida Sans"}}>{a.post_text}</div>
               </div>
             <CardCom a={a}/>
         
             
            
</div> 
            
            </div></>:
        <></>
          }
           </>)}
    </div>
    </div>
    )
}

export default Account
