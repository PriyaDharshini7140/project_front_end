import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, FormControl, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, TextField } from '@material-ui/core';
import './UserLogin.css'
import { Link } from 'react-router-dom';
import Axios from 'axios';

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
function UserLogin(props) {
    const classes = useStyles();
const [login, setLogin] = useState({email_id:'',password:''})
const [Data, setData] = useState([])
     useEffect(()=>{
      Axios.post('http://localhost:4000/user/login').then(
        (res)=>setData(res.data)
       )
      },[])
     
    console.log(Data);
  
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  
    return (
        
        <div className='user-login'>
            <Card className='user-login-card'>
                <center><h3>
                    <b className="user-login-cardAction">
               Hi Welcome Back !!!!
       </b> </h3></center>
           <form className={classes.root}  autoComplete="on">
                
          
            <b>Email</b>          <center> <TextField id="outlined-basic" label='email' type="email" variant="outlined" /></center>
           

            
             <b>Password</b>      <center> <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
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
           
             </form>
            <div className={classes.root1}>
             <Button className='user-login-card-button' onClick={()=>{props.history.push('/home page')}
                 }>login</Button><br/>
                 
             <Button className='user-login-card-button' onClick={()=>{
                
                 props.history.goBack()
                 }}>Back</Button> <br/>
                </div>
              <center>
       <Link to='/Sign up'>Create a Account</Link>  
               </center>
            </Card>
         
        </div>
    )
}

export default UserLogin
