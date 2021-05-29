import React, { useState } from 'react'
import { Button, Card, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField, Tooltip } from '@material-ui/core';
import './UserLogin.css'
import { Link, Redirect } from 'react-router-dom';
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
function ForgetPassword(props) {
const dispatch = useDispatch();
console.log(props);

  
    const classes = useStyles();
const [email, setEmail] = useState('')
const [password,setPassword] = useState('')
const [pas,setPas] = useState('')

    const [values, setValues] = React.useState({
        showPassword: false,
      });
    
      
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      return (
        
        <div className='user-login'>
            <div className='user-login-card'>
            <div className="user-login-cardAction">
               RESET PASSWORD<LockOpenOutlinedIcon/>
       </div>
       <div className='innerCard'>
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
           <Tooltip title='From 8 to 15 characters' arrow>
            
           <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          
          <TextField 
          placeholder='Password'
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
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
             <Button className='user-login-card-button' onClick={()=>{ 
               if(password === pas){
                AuthService.setPassword(email,password).then(()=>alert("password has been set"),props.history.push('/Sign in'))
               }
               else if(password !== pas){
                   alert("password doesn't match please check")
               }
               
            }
            
            }>set</Button><br/>
              
                </div>
              </div>
            </div>
         
        </div>
    )
}



export default ForgetPassword;
