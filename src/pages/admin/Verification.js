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

export default function ActionAlerts() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user.users)

  console.log(user);

  const request = useSelector((state)=>state.verification.status)
  console.log(request);
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  return (
    <>
    {request.map(e=> e.status === "notVerified" ?<div className={classes.root}>
   
   <Alert
     action={
       <>
       <IconButton>
     <ExpandMoreIcon onClick={handleClickShowPassword}/>
       </IconButton>
       <IconButton
         aria-label="close"
         color="inherit"
         size="small"

         
         
         onClick={() => 
          {console.log("click")
            dispatch(Verification(e._id,e.user_id._id,user._id,"Rejected"))
           
          }
          }
       >
         <CloseIcon fontSize="inherit" className={classes.spaces} />
       
       </IconButton>
        <IconButton
        // aria-label="close"
        // color="inherit"
        // size="small"
        
        onClick={() => 
          {console.log("click")
            dispatch(Verification(e._id,e.user_id._id,user._id,"Verified"))
            
          }
          }
      >
        <CheckRoundedIcon fontSize="inherit"/>
      </IconButton>
      </>
     }
   >
     id:{e.user_id._id}<br/>
    userName: {e.user_id.user_name} <br/>
    {values.showPassword === true? <>
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