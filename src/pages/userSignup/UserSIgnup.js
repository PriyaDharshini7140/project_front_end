import React, { useEffect, useState } from 'react'
import {Button, Card } from '@material-ui/core';
import './UserSIgnup.css'
import { Link } from 'react-router-dom';
import Axios from 'axios';

import {ButtonGroup,FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
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
      const register=(user_name,email_id,password)=>{
        const signup = {
          user_name:user_name,
          email_id:email_id,
          password:password
        }
         console.log(signup)
         Axios.post('http://localhost:4000/user/login',{signup})
         .then( (res)=>console.log(res.data))
         .then(
          alert("Registered successful")
         ).catch((e)=>{alert(e.message)})
      }
      const handleSubmit =(e)=>{
        e.preventDefault()
      }
      const  validateForm=()=>{
        return(
          name.length > 0 &&
         email.length > 0 &&
        password.length > 0 
        )
          }
    
      const classes = useStyles();
    return (
        <div className='user-signup'>
        <Card className='user-signup-card'>
            <center>
                <h3 >
                    <b className="user-signup-cardAction">
           Welcome to Idea Wrapper
   </b> </h3></center>
           
   <form className={classes.root}  autoComplete="on" onSubmit={handleSubmit}>
   <b>userName</b>          <center> <TextField id="outlined-basic" label='UserName' type="text" variant="outlined"  onChange={(e)=>setName(e.target.value)} /></center>
               
          
                <b>Email</b>          <center> <TextField id="outlined-basic" label='email' type="email" variant="outlined"  onChange={(e)=>setEmail(e.target.value)} /></center>
               
    
                
                 <b>Password</b>      <center> <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={(e)=>setPassword(e.target.value)}
                endAdornment={
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
                }
                labelWidth={70}
              />
            </FormControl></center>
               
                
         
         <Button className='user-signup-card-button' onClick={()=>{register(name,email,password)}}  disabled={!validateForm()}>Register</Button><br/>
         </form>
         <center>
         
       <Link to='/Sign in'>Already a User</Link>  
               </center>
           
        </Card>
     
    </div>
       
    )
}

export default UserSIgnup