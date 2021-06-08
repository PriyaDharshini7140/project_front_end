import React, { useState } from 'react'
import { Button, InputAdornment, makeStyles, TextField, Tooltip } from '@material-ui/core';
import './UserLogin.css'

import {useDispatch} from "react-redux";

import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

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
const dispatch = useDispatch();
console.log(props);

  
    const classes = useStyles();
const [email, setEmail] = useState('')

      return (
        <div>
        <div className='user-login'>
            <div className='user-login-cardf'>
            <div className="user-login-cardAction">
               RESET PASSWORD<LockOpenOutlinedIcon/>
       </div>
       <div className='innerCardf'>
         <center>
           <form className={classes.root}  autoComplete="on">
                
           <Tooltip title='Enter valid Email' arrow>
           <TextField id="outlined-basic" 
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>,
            }}
            placeholder='email'
           type="email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
           </Tooltip>
           
             </form>
             </center>
            <div className={classes.root1}>
             <Button className='user-login-card-button' onClick={()=>
            AuthService.setPassword(email).then(()=>alert("check your mail"))
            }
            // disabled={validatepassword()}
            >set</Button><br/>
              
                </div>
              </div>
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



export default ForgetPassword;
