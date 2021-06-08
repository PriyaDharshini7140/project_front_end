import React from 'react'
import './UserProfile.css'
import { useSelector } from 'react-redux';
import CardCom from '../../components/card/CardCom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
// import Services from "../../services/Services"
import { Avatar, Card, makeStyles } from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import WorkIcon from '@material-ui/icons/Work';
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      
    },
   
  }));
function UserProfile(props) {
  const history = useHistory()
    const {location:{state}}=history;
    console.log(state);
    console.log(history);
    // const user = useSelector((state)=> state.user.users)
    const auth = useSelector((state)=> state.user.authorization)
    // console.log(user);
    
    const Data = useSelector((state)=> state.post.posts)
   console.log(Data.map(e=> e.user_id));
const classes = useStyles()

    return (
        <div>
         <div className='user'>
        <div className='user_inner'>
          <div className='user_inner_details'>
          <Avatar alt={state.user_name} src={state.profile_picture} className={classes.large}/>
          <div className='user_inner_details_avatars'><PersonIcon/> {state.user_name}{auth.status === "Verified" ? 
         <VerifiedUserRoundedIcon className='verify'/>:<></>}</div>
          
          <div className='user_inner_details_avatars'>  <EmailIcon/>  {state.email_id}</div>
        
          <div className='user_inner_details_avatars'><PhoneIcon/> {!state.phone_number ? <>not mentioned</>:state.phone_number}</div>
          
          <div className='user_inner_details_avatars'><WorkIcon/> {!state.work ? <>not mentioned</>:state.work}</div>
           
           <div className='user_inner_details_avatars'><SchoolRoundedIcon/> {!state.education ? <>not mentioned</>:state.education}</div>
           
           <div className='user_inner_details_avatars'><DescriptionRoundedIcon/> {!state.description ? <>not mentioned</>:state.description}</div>
           
         
          </div>
            
      </div>
       </div>
         
             {Data.map((e)=> <>{
           state._id === e.user_id ? <><CardCom a={e}/></>:<></>
          
          }
           </>)}
           
        </div>
    )
}

export default UserProfile
