import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import {TextField } from '@material-ui/core';

import {useDispatch} from 'react-redux'
// import {Post} from '../../redux/postActions'
// import AuthService from '../../auth/AuthService';
import { useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
// import { reports } from '../../redux/verficationAction';
import { Button, InputAdornment} from '@material-ui/core';

import { FormControl, IconButton} from '@material-ui/core';
// import './UserLogin.css'
// import {useDispatch} from "react-redux";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import clsx from 'clsx';
import { UpdatePassword } from '../../redux/Actions';
// import {useDispatch} from "react-redux";

// import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

// import EmailIcon from '@material-ui/icons/Email';



// import AuthService from '../../auth/AuthService';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display:"flex",
    flexDirection:'column',
    marginLeft:"7rem",
  marginTop:"-5rem",
    // alignSelf: 'center',
    // justifySelf: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius:"20px",
   
    padding: theme.spacing(2, 4, 3),
    borderColor:"rgb(243, 220, 220)",
  },
  text:{
      width:"100%"
  },
  camera:{
    color:"rgb(97, 96, 96)",
     alignSelf:"center",
     paddingTop:'-5%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
  display: 'none',
} ,form_Control: {
  margin: theme.spacing(1),
  minWidth: 120,
  maxWidth: 300,
},
chips: {
  display: 'flex',
  flexWrap: 'wrap',
},
chip: {
  margin: 2,
},
select:{width:"100%"},
noLabel: {
  marginTop: theme.spacing(3),
},
 
}));

export default function ModalPassword() {
  const classes = useStyles();



  const [open, setOpen] = React.useState(false);
  // const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")
   const user = useSelector((state)=> state.user.users)
  // console.log(user.email_id);
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    // console.log("clicked");
  };
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
 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const body = (
    <div  className={classes.paper}>
      
      <h5>Update Password</h5>
            
      
         <center>
           
                
           {/* <div>
           <TextField id="outlined-basic" 
           style={{width:"100%"}}
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>,
            }}
            placeholder='email'
           type="email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
           */}
           <div>
           <FormControl className={clsx(classes.margin)} variant="outlined">
          {console.log(password)}
          <TextField 
         style={{width:"100%",color:"black"}}
          placeholder='Password'
            // id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            // value={values.password}
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
        </div>
             </center>
            {/* <div className={classes.root1}> */}
            <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}} onClick={()=>{
            dispatch(UpdatePassword(user.email_id,password));
            setOpen(false)
            }}>set</Button>
       </center>
                
              
                </div>
              // </div>
            
           
     
       
         

     
    
  );

  return (
    <div>
      <MenuItem onClick={handleOpen}>password reset</MenuItem>
      
      <Modal
      style={{display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',}}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
