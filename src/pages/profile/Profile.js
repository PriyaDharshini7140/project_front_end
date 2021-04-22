import React, { useState } from 'react'
import "./Profile.css"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, Container, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import {connect} from 'react-redux';
import {useLocation} from "react-router-dom";
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      
      },
      alignItems:"center",
    },
    input: {
    display: 'none',
  },
  camera:{
    color:"#E3ABAB",
    // alignSelf:"center"
  },

  }));

function Profile(props) {
    const classes = useStyles();
    const [gender, setGender] = useState('');
    const [profile_picture, setprofile_picture] =useState('');
    const [age, setAge] =useState('');
    const [user_name, setUser_name] =useState('');
    const [phone_number, setphone_number] =useState('');
    const [password, setpassword] =useState('');
   

const handleSubmit =(user_name,age,gender,phone_number,profile_picture,password)=>{
  
  Axios.patch(`http://localhost:4000/user/updateUser/${state._id}`,{
    user_name:user_name,
    age:age,
    gender:gender,
    phone_number:phone_number,
    profile_picture:profile_picture,
    password:password
  })
   .then( (res)=>console.log(res.data))        
   .then(
    alert("updated successfully to view go to account page")
   ).catch((e)=>{alert(e.message)})

 
}

let location = useLocation();
// console.log(location);
const {state} =location;
  console.log(state);
    return (
    
        <div className="profile" key={state._id}>
            <div className="profile__body">
                <div className="profile__body__left">
               <Avatar  alt="Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
              
               <input accept="image/*" className={classes.input} onChange={(e)=>setprofile_picture(e.target.value)} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.camera}  aria-label="upload picture" component="span">
          <CreateRoundedIcon />
        </IconButton>
      </label>
      <Container className="container">
        <TextField
          label="your skills"
          type="text"
           
        />
      </Container>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
      <div> <TextField
          label="userName"
          type="text"
          onChange={(e)=>setUser_name(e.target.value)}
           variant="outlined"
        /><br/>
       
        <TextField
          id="outlined-password-input"
          label="age"
          type="text"
          onChange={(e)=>setAge(e.target.value)}
          
          variant="outlined"
        /><br/>
         <TextField
          id="outlined-password-input"
          label="gender"
          type="text"
          onChange={(e)=>setGender(e.target.value)}
          variant="outlined"
        />
    <br/>
         <TextField
          id="outlined-password-input"
          label="phone number"
          type="text"
          onChange={(e)=>setphone_number(e.target.value)}
          variant="outlined"
        /><br/>
         <TextField
          id="outlined-password-input"
          label="password"
          type="password"
          onChange={(e)=>setpassword(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
        />
        </div>
        <Button variant="outlined" onClick={()=>handleSubmit(user_name,age,gender,phone_number,profile_picture,password)}>save</Button>
        <Button variant="outlined">reset</Button>
        <div>
        
        </div>
       
          </form>  
            </div>
           <div>
           
          </div>
     
             </div>
            //  </div>
    )
}

export default Profile
