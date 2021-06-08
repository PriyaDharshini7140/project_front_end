import React, { useState } from 'react'
import { Button,FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField, Tooltip } from '@material-ui/core';
import './Login.css'
import { Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import clsx from 'clsx';
import EmailIcon from '@material-ui/icons/Email';
import { fetchUsers } from '../../redux/Actions';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
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
        width:"100%"
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
      icon:{
        color:"#00BAFF"
      },
  }));
function UserLogin(props) {
const dispatch = useDispatch();
console.log(props);

  
    const classes = useStyles();
const [email, setEmail] = useState('')
const [password,setPassword] = useState('')


    const [values, setValues] = React.useState({
        showPassword: false,
      });
    
      
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      return (<div>
        
        <div class="login-cont">
          <div class="login-form form-group">
           
               
                   
              <h3>LOGIN <VpnKeyIcon/></h3> 
      
       <div className="login-inputs">
         
           <form className={classes.root}  autoComplete="on">
             
           <Tooltip title='Enter valid Email' arrow>
                 <TextField id="outlined-basic"
                className="login-inputs"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon  className={classes.icon}/></InputAdornment>,
                  }}
                  placeholder='email'
                 type="email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
                </Tooltip>
                <br/>
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
              startAdornment:<InputAdornment position="start"><LockOpenOutlinedIcon className={classes.icon}/></InputAdornment>,
            
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility className={classes.icon} /> : <VisibilityOff className={classes.icon}/>}
                </IconButton>
              </InputAdornment>
            }}
            labelWidth={70}
          />
        </FormControl>
        </Tooltip>
         
             </form>
            
            
            <div className={classes.root1}>
              <center>
             <Button className='user-login-card-button' onClick={()=>{ 
               dispatch(fetchUsers(email,password))
            }
            
            }>login</Button>
            </center>
            <br/>
                </div>
              <center>
       <Link to='/Sign up' className='nav-lin'>Do you have a account ?</Link>
       <Link to='/forgot password' className='nav-lin'>Forgot password</Link> 
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



export default UserLogin;
