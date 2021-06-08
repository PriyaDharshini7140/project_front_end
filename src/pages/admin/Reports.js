import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { useSelector,useDispatch } from 'react-redux';
import { Deletereports, DeletereportsPost, Verification } from '../../redux/verficationAction';
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

export default function Reports() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user.users)

  console.log(user);
const report = useSelector((state)=>state.verification.reports)
  const request = useSelector((state)=>state.verification.status)
  console.log(request);
  console.log(report)
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  return (
    <>{
        report ? 
    report.map(e=><div className={classes.root}>
   
   <Alert
     action={
       <>
       <IconButton>
     <ExpandMoreIcon onClick={handleClickShowPassword}/>
       </IconButton>
       <div style={{padding:"1rem"}}>
       <button className='navbar_button' onClick={()=>dispatch(Deletereports(e._id))}>delete report</button>
       
       </div>
       <div style={{padding:"1rem"}}>
     
       <button className='navbar_button' onClick={()=>dispatch(DeletereportsPost(e._id,e.post_id._id))}>delete reported Post</button>
       </div>
      </>
     }
   >
     Report:{e.report_reason}<br/>
    userName: {e.user_id.user_name} <br/>
    PostId:{e.post_id._id}<br/>
    {values.showPassword === true? <>
   <strong>userDetails</strong> <br/>
      emailId:{e.user_id.email_id}<br/>
      phoneNumber:{e.user_id.phone_number}<br/>
      Gender:{e.user_id.gender}<br/>
      Age:{e.user_id.age}<br/>
      <strong>postDetails</strong> <br/>
      Post:{e.post_id.post_text}<br/>
      
    </>:<></>
      
  }
 </Alert>
</div>)
    :<></>}
  </>
  );
}