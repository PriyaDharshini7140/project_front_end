import React from 'react'
import "./Profile.css"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {IconButton} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
      alignSelf:"center",
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
    input: {
    display: 'none',
  },
  camera:{
    color:"#E3ABAB",
     alignSelf:"center",
     paddingTop:'-5%'
  },

  }));

function Profile() {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    return (
    
        <div className="profile">
            <div className="profile__body">
                <div className="profile__body__left">
               <Avatar  alt="Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
               {/* <h1>update your profile</h1> */}
               <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.camera}  aria-label="upload picture" component="span">
          <CreateRoundedIcon />
        </IconButton>
      </label>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
      <div> <TextField
         
          label="firstName"
          type="text"
          
          variant="outlined"
        />
        <TextField
         
          label="lastName"
          type="text"
          
          variant="outlined"
        />
        </div>
        <div>
        <TextField
          id="outlined-password-input"
          label="firstName"
          type="text"
          autoComplete="current-password"
          variant="outlined"
        />
        </div>
       
          </form>  
            </div>
           <div>
           
          </div>
      {/* <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl> */}
             </div>
            //  </div>
    )
}

export default Profile
