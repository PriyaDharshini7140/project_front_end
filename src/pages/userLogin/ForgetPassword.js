import React, { useState } from 'react'
import { Button, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import './UserLogin.css'

import {useDispatch} from "react-redux";



import EmailIcon from '@material-ui/icons/Email';



import AuthService from '../../auth/AuthService';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    root1:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding:'10px',
        marginLeft:'70px',
            '& > *': {
                alignItems:'center',
              margin: theme.spacing(1),
             
             
            },
        
    },
    margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: '25ch',
      },
  }));
function ForgetPassword(props) {



  
    const classes = useStyles();
const [email, setEmail] = useState('')

      return (
        <div>
      <div className='user-signup'>
        
       
        <div className='inner-reg'>
        <center><h5 style={{marginLeft:"7rem"}}>RESET PASSWORD</h5></center>
          <center>
    <form className={classes.root}  autoComplete="on" >
    
           <div>
            <TextField id="outlined-basic" placeholder='email' style={{width:"40ch",backgroundColor:"rgba(0, 0,0,0.03)"}} type="email" variant="outlined"
              InputProps={{
               startAdornment: <InputAdornment position="start"><EmailIcon className={classes.icon}/></InputAdornment>,
             }}
           
             onChange={(e)=>setEmail(e.target.value)} />
                </div>
                
           
          </form>
         
             </center>
            <center>
             <Button variant="contained" color="primary"style={{borderRadius:"40px",marginLeft:"8rem"}} onClick={()=>
            AuthService.setPassword(email).then(()=>alert("check your mail"))
            }
            // disabled={validatepassword()}
            >set</Button><br/>
              
                </center>
              </div>
            </div>
         
        </div>
        
       
    )
}



export default ForgetPassword;
