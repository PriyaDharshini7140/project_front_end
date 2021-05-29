import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { useSelector,useDispatch } from 'react-redux';
import { Verification } from '../../redux/verficationAction';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  spaces:{
    paddingRight:"5%"
  }
}));

export default function Alerts() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user.users)
 
  console.log(user);
  const [Open,setOpen] = useState(1);
  const request = useSelector((state)=>state.verification.status)
  console.log(request);
  return (
    <>
    {request.map(e=> e.status === "Verified" && e.admin_id === user._id ? <div className={classes.root}>
   
   <Alert
     action={
      <ExpandMoreIcon onClick={()=>{
        const add = Open+1;
         setOpen(add)
         
     }}/>
     }>
   id:{e.user_id._id}<br/>
    userName: {e.user_id.user_name} <br/>
    {Open % 2 === 0 ? <>
      emailId:{e.user_id.email_id}<br/>
      phoneNumber:{e.user_id.phone_number}<br/>
      Gender:{e.user_id.gender}<br/>
      Age:{e.user_id.age}<br/>
    </>:<></>
      
  }
   </Alert>
</div>:<></>)}
    
  </>
  );
}