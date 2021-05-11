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
import AuthService from "../../auth/AuthService"
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useHistory } from "react-router-dom";
import Services from '../../services/Services';
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
    const [image, setImage] =useState('');
    const [age, setAge] =useState('');

    const [phone_number, setphone_number] =useState('');
   
    const [description, setDescription] =useState('');
   const history = useHistory();
  console.log(history)
  const user = AuthService.getCurrentUser();
  console.log(user);
const handleSubmit = async(age,gender,phone_number,description)=>{
  console.log(description ,age);
  var formdata = new FormData();

  formdata.append("file", image);
  formdata.append("cloud_name", "ideawrapper");
  formdata.append("upload_preset", "ideahub");

  let res = await fetch(
  "https://api.cloudinary.com/v1_1/ideawrapper/image/upload",
  {
      method: "post",
      mode: "cors",
      body: formdata
  }
  )
  .then(res=>res.json())
  .then(data=>{
    Axios.patch(`http://localhost:4000/user/updateUser/${user._id}`,{
      
      age:age,
      gender:gender,
      phone_number:phone_number,
      profile_picture:data.url,
     description:description
    })
     .then( (res)=>{console.log( "updated",res.data)
     localStorage.setItem("user", JSON.stringify(res.data));
    })      
     .catch((e)=>{alert(e.message)})
  
  })
  .catch(err=>{
      console.log(err)
  })
 
 
 
}

let location = useLocation();
// console.log(location);
const {state} =location;
  console.log(state);
    return (
    
        <div className="profile" key={user._id}>
       
            <div className="profile__body">
             
                <div className="profile__body__left">
                
               <Avatar  alt={user.user_name} src={user.profile_picture} className={classes.large}/>
              
               <input accept="image/*" className={classes.input} onChange={(e)=>setImage(e.target.files[0])} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.camera}  aria-label="upload picture" component="span">
          <CreateRoundedIcon />
        </IconButton>
      </label>
      {/* <div className="container">
        <TextField
          label="your skills"
          type="text"
          onChange={(e)=>setDescription(e.target.value)}
        />
      </div> */}
            </div>
            <form className={classes.root} noValidate autoComplete="off">
             <HomeRoundedIcon className="nav-item1" fontSize="large" onClick={()=>history.goBack()}/>
      <div>
         <TextField
          label="userName"
          type="text"
          value={user.user_name}
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
          // id="outlined-password-input"
          label="skills"
          type="text"
          // value={user.password}
          onChange={(e)=>setDescription(e.target.value)}
          variant="outlined"
          // className="container"
        />
        </div>
        <Button variant="outlined" onClick={()=>handleSubmit(age,gender,phone_number,profile_picture,description)}>save</Button>
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
