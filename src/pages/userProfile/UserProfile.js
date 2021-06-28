import { Avatar, makeStyles ,Tooltip} from '@material-ui/core'
import React from 'react'
import './UserProfile.css'
import { useHistory } from "react-router-dom";

import { useSelector } from 'react-redux';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';

import CardCom from '../../components/card/CardCom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';

import WorkIcon from '@material-ui/icons/Work';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import {Link} from 'react-router-dom';

import moment from 'moment';
import { HiBadgeCheck } from "react-icons/hi";

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

function UserProfile() {
  const history = useHistory();
  const user = history.location.state
  const auth = useSelector((state)=> state.user.authorization)
  // const Cuser= useSelector((state)=> state.user.user)
  const mvp = useSelector((state)=> state.post.mvp)
  const filter = mvp && mvp.filter((e)=>e.user_id === user._id)
  // console.log(filter.length);
  const verified = filter && filter.filter((e)=>e.selected === true)
  // console.log(verified.length);
  // const dispatch = useDispatch();
  
  // console.log(history);
  
  const Data = useSelector((state)=> state.post.posts)
console.log(Data.map(e=>e.user_id));
const classes = useStyles()
    return (
      <div>
      <div className='wrapper-Acc' style={{color:"white"}}>
      <div>
      {/* <div className="edit"></div> */}
      <center>
        {/* <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={<ModalProfile/>}
      > */}
        
        <Avatar style={{marginTop:"1rem"}} alt={user.user_name} src={user.profile_picture} className={classes.large}/>
        {/* </Badge> */}
        </center>
     
      
        
       </div>
       <div className="details">
       <h3> 
          <div><PersonIcon/> {user.user_name}{auth.status === "Verified" ? 
         <VerifiedUserRoundedIcon className='verify'/>:<></>}</div></h3>
          <div> <EmailIcon style={{marginRight:".3rem"}}/>{user.email_id}</div>
          <div>{!user.phone_number ? <></>:<><PhoneAndroidRoundedIcon style={{marginRight:".3rem"}}/>{user.phone_number}</>}</div>
        <div>{!user.work ? <></>:<><WorkIcon style={{marginRight:".3rem"}}/>{user.work}</>}</div>
        <div>{!user.education ? <></>:<><SchoolRoundedIcon style={{marginRight:".3rem"}}/>{user.education}</>}</div>
        
      
      </div>
      <div>
         {/* <div className="edit"><ModalProfile/></div> */}
       
        <p className="te">
        <b>{user.description ?<>About:</>:<></> }</b>
          {user.description}
        </p></div>
    </div>
    <center>
    <div className="wrapper-Acc-solution">
      <Tooltip title="Click to view solutions" arrow>
      <div onClick={()=>history.push({pathname:"/solution",state:filter})}>total solutions:{filter.length}</div>
      </Tooltip>
      <Tooltip title="Click to view solutions" arrow>
        <div onClick={()=>history.push({pathname:"/solution",state:verified})}><HiBadgeCheck style={{color:"#76ff03",fontSize:"25px",marginRight:".2rem"}}/>Approved Solution:{verified.length}</div>
        </Tooltip>
    </div>
    </center>
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

export default UserProfile
