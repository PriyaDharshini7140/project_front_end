import React, { useEffect, useState } from 'react'
import {Button, Card, Tooltip } from '@material-ui/core';
import './UserSIgnup.css'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {ButtonGroup,FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import AuthService from '../../auth/AuthService';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import validator from 'validator'
import { validate } from 'react-email-validator';
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
function UserSIgnup(props) {
  
    const [values, setValues] = useState({
        showPassword: false,
      });
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      const handleSubmit =(e)=>{
        e.preventDefault()
      }
      function validateName() {
        if(!name)
        return("Name Required")
    }
    
    function ValidateEmail() 
    {
    if (!email)
      {
        return ("Email Required")
      }
      else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      {
          return("Invalid Email")
      }
    }
    
    function validatepassword(){
        if(!password){
            return("Password Required")
        }
        else if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password))
        {
            return("password should have one uppercase,number and special character ")
        }
      }
     
    
      const classes = useStyles();
    return (
      <div>
        <div className='user-signup'>
        <div className='user-signup-card'>
        <div className="user-login-cardAction">
              REGISTER<EmojiObjectsIcon/>
       </div>
       <div className='innerCard'>
         <center>
   <form className={classes.root}  autoComplete="on" onSubmit={handleSubmit}>
   <Tooltip title='From 4 to 20 letters' arrow>
    <TextField id="outlined-basic" helperText={validateName()}
    InputProps={{
      startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
    }}
   placeholder="userName" type="text" variant="outlined"  onChange={(e)=>setName(e.target.value)} />
               
          </Tooltip>
          <Tooltip title='Enter valid Email' arrow>
           <TextField id="outlined-basic" placeholder='email' type="email" variant="outlined" helperText={ValidateEmail()}
             InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>,
            }}
          
            onChange={(e)=>setEmail(e.target.value)} />
               </Tooltip>
               <Tooltip title='From 8 to 15 characters' arrow>
                
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              
              <TextField
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                placeholder="password"
                helperText={validatepassword()}
                variant="outlined"
                onChange={(e)=>setPassword(e.target.value)}
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
         
         <Button className='user-signup-card-button' onClick={()=>{
           if(validate(email)){
            AuthService.register(name,email,password).then((e)=> {
              console.log(e);
               props.history.push('/Sign in')
            }
              )
           }
         else{
           alert('Enter valid Email')
         }
         }}disabled={validateName(),ValidateEmail(),validatepassword()}>Register</Button><br/>
         </form>
         </center>
         <center>
         
       <Link to='/Sign in' className="nav-lin">Already a User</Link> 
       
               </center>
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

export default UserSIgnup