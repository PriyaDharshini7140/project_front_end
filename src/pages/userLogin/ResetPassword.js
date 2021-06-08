import React, { useState } from 'react'
import { Button, Card, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField, Tooltip } from '@material-ui/core';
import './UserLogin.css'
import { Link, Redirect, useParams } from 'react-router-dom';
import {useDispatch} from "react-redux";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import clsx from 'clsx';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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
function ResetPassword(props) {
const dispatch = useDispatch();
console.log(props.location.pathname);
const {token} = useParams()
console.log(token)
  
    const classes = useStyles();

const [password,setPassword] = useState('')
const [pas,setPas] = useState('')

    const [values, setValues] = React.useState({
        showPassword: false,
      });
      function validatepassword(){
        if(!password){
            return("Password Required")
        }
        else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password))
        {
            return("password should have one uppercase,number and special character ")
        }
      }
     
      
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
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
           <Tooltip title='From 8 to 15 characters' arrow>
            
           <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          
          <TextField 
          placeholder='Password'
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            helperText={validatepassword()}
            onChange={(e)=>setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment:<InputAdornment position="start"><LockOpenOutlinedIcon /></InputAdornment>,
            
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
            labelWidth={70}
          />
        </FormControl>
        </Tooltip>
        <Tooltip title='From 8 to 15 characters' arrow>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
         
          <TextField
            id="outlined-adornment-password"
            placeholder='confirm Password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            helperText={validatepassword()}
            variant="outlined"
            onChange={(e)=>setPas(e.target.value)}
            InputProps={{
              startAdornment:<InputAdornment position="start"><LockOutlinedIcon/></InputAdornment>,
            
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
            labelWidth={70}
          />
        </FormControl>
        </Tooltip>
             </form>
             </center>
            <div className={classes.root1}>
             <Button className='user-login-card-button' onClick={()=>
           {
            if(password === pas){
                AuthService.setNewPassword(password,token)
               }
               else if(password !== pas){
                   alert("password doesn't match please check")
               }
           }
            }
            disabled={validatepassword()}
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



export default ResetPassword;
