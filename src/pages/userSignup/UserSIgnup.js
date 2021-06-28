import React, {  useState } from 'react'
import {Button} from '@material-ui/core';
import './UserSIgnup.css'
import { Link } from 'react-router-dom';
// import Axios from 'axios';
import {FormControl, IconButton, InputAdornment,makeStyles,  TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
// import AuthService from '../../auth/AuthService';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

// import validator from 'validator'
import { validate } from 'react-email-validator';
import axios from 'axios';
require("dotenv").config()
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    root1:{
        display: 'flex',
        flexDirection: 'column',
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
      icon:{
        // color:"gray"
      },
  }));
function UserSIgnup(props) {
  
    const [values, setValues] = useState({
        showPassword: false,
      });
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
     
    
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
   function register(user_name, email_id, password) {
      return axios.post(`https://us-central1-project-ec76e.cloudfunctions.net/app/user/addUser`,{
          user_name:user_name,
          email_id:email_id,
          password:password
         }).then((res)=>{
           if(res.data.message === "Registered successfully  please login in "){
            toast.success(res.data.message,{
              position: "top-center",
              autoClose: 2000,
              
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
             
              })
           }
           else{
            toast.error(res.data.message,{
              position: "top-center",
              autoClose: 2000,
              
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
             
              })
           }
          
          // console.log(res.data.data._id);
       
        }).catch((e)=>console.log(e))
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
        
       
       <div className='inner-reg'>
         <center><h5 style={{marginLeft:"7rem"}}>Register</h5></center>
        
         <center>
   <form className={classes.root}  autoComplete="on" onSubmit={handleSubmit}>
   <div >
    <TextField id="outlined-basic" 
    
    className="box-text"
    InputProps={{
      startAdornment: <InputAdornment position="start"><PersonIcon className={classes.icon}/></InputAdornment>,
    }}
   placeholder="userName" type="text" variant="outlined"  onChange={(e)=>setName(e.target.value)} helperText={validateName()}/>
               
          </div>
          <div>
           <TextField id="outlined-basic" placeholder='email'  className="box-text" style={{color:"white"}} type="email" variant="outlined" helperText={ValidateEmail()}
             InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon className={classes.icon}/></InputAdornment>,
            }}
          
            onChange={(e)=>setEmail(e.target.value)} />
               </div>
               <div>
                
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              
              <TextField
               className="box-text"
              style={{marginLeft:"-.5rem"}}
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                placeholder="password"
                helperText={validatepassword()}
                variant="outlined"
                onChange={(e)=>setPassword(e.target.value)}
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
               
           </div>
         <center>
         <Button  variant="contained" color="primary"style={{borderRadius:"40px",marginLeft:"8rem"}} onClick={()=>{
           if(validate(email)){
          register(name,email,password).then((e)=> {
              console.log(e);
              //  props.history.push('/Sign in')
            }
              )
           }
         else{
           alert('Enter valid Email')
         }
         }}disabled={validateName(),ValidateEmail(),validatepassword()}>Register</Button>
         <ToastContainer position="top-center"
         autoClose={2000}
         hideProgressBar
         
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover/>
         </center><br/>
         </form>
         {/* </center> */}
         </center>
         <center>
         <div style={{marginLeft:"8rem"}}>
         Already a User <Link to='/'>Login?</Link> </div>
       
               </center>
               </div>
               
        </div>
        
    </div>
   
    
    )
}

export default UserSIgnup