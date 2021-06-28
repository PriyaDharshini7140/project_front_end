import React, { useState } from 'react'
import { Button,FormControl, IconButton, InputAdornment,  makeStyles, TextField } from '@material-ui/core';
import './Login.css'
import { Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import clsx from 'clsx';
import EmailIcon from '@material-ui/icons/Email';
import { fetchUsers } from '../../redux/Actions';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
// import { validate } from 'react-email-validator';
import { ToastContainer} from 'material-react-toastify';
  import 'material-react-toastify/dist/ReactToastify.css';

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
          // color:"gray"
        },
     
  }));
function UserLogin(props) {
const dispatch = useDispatch();
// console.log(props);

  
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
        
        <div className='user-signup'>
        
       
       <div className='inner-reg'>
       <center><h5 style={{marginLeft:"7rem"}}>Login</h5></center>
         <center>
   <form className={classes.root}>
   
          <div>
           <TextField id="outlined-basic" placeholder='email' className="box-text" type="email" variant="outlined"
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
               dispatch(fetchUsers(email,password))

            }
            
            }>Login</Button>
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
         Do you have an account create one <Link to='/Sign up'>Sign up?</Link> </div>
         <div style={{marginLeft:"8rem"}}>
         Forget password <Link to='/forgot password'>Reset</Link> </div>
       
               </center>
               </div>
               
        </div>
        
        
        </div>
    )
}



export default UserLogin;
