import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { Avatar,InputAdornment,TextField } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';

import WorkIcon from '@material-ui/icons/Work';

import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import {useDispatch} from 'react-redux'

import { useSelector } from 'react-redux';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Badge from '@material-ui/core/Badge';
import { updateUser } from '../../redux/Actions';




const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    margin:'auto',
    width: 700,
    height:500,
   
    backgroundColor: theme.palette.background.paper,
    borderRadius:"20px",
    padding: theme.spacing(2, 4, 3),
    borderColor:"rgb(243, 220, 220)",
    display:'flex',
    flexDirection:'row'
   
  },
  text:{
      width:340
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    // '&:hover': {
    //     // cursor: 'pointer',
    //     // backgroundColor: 'grey',
    //     "& $camera": {
            
    //     }
    //  }
  },
  pink: {
    color: theme.palette.getContrastText("#f06292"),
    backgroundColor: "#f06292",
  },
  camera:{color:"blue",},
//   input: {
//     display: 'none',
    
//   },
 
 

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
   form_Control: {
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
noLabel: {
  marginTop: theme.spacing(3),
},
 
}));

 function ModalProfile() {
  const classes = useStyles();
  const user = useSelector((state)=> state.user.users)
  console.log(user);
  const [work, setWork] = useState(user.work);
    // const [img,setImge] =useState("");
    const [image, setImage] =useState('');
    const [education, setEducation] =useState(user.education);
    const [name, setName] =useState(user.user_name);
    const [phone_number, setphone_number] =useState(user.phone_number);
   
    const [description, setDescription] =useState(user.description);
   
 
const handleSubmit = async(name,phone,work,education,description)=>{
 
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
     dispatch(updateUser(user._id,name,phone,data.url,work,education,description))  
  })
  .catch(err=>{
      console.log(err)
  })
 
 
 
}

  const [open, setOpen] = React.useState(false);
  
 
   
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    console.log("clicked");
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
   
 


  const body = (
    <div  className={classes.paper}>
        
          <h5>Update Profile</h5>
      
     {/* <div > */}
     <Badge
        overlap="circle"
        style={{alignSelf:"center"}}
        badgeContent={<>
          <input accept="image/*" className='d' onChange={(e)=>setImage(e.target.files[0])} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
         
            <PhotoCamera className={classes.camera} />
          
        </label>
        </>
        }
      >
        <Avatar alt={user.user_name} src={user.profile_picture} className={classes.large}/>
      </Badge>
        <div className="texts" style={{padding:"1rem"}}>
     <TextField id="outlined-basic" value={name} type="text" variant="outlined" 
     onChange={(e)=>setName(e.target.value)}
             InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment>,
            }}/>
                 <TextField id="outlined-basic" value={user.email_id} placeholder='email' type="email" variant="outlined"
             InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>,
            }}/>
             <TextField id="outlined-basic" placeholder='phone number' onChange={(e)=>setphone_number(e.target.value)} value={phone_number} type="text" variant="outlined"
             InputProps={{
              startAdornment: <InputAdornment position="start"><PhoneIcon/></InputAdornment>,
            }}/>
             <TextField id="outlined-basic" placeholder='Employment Credentials' onChange={(e)=>setWork(e.target.value)} value={work} type="text" variant="outlined"
             InputProps={{
              startAdornment: <InputAdornment position="start"><WorkIcon/></InputAdornment>,
            }}/>
             <TextField id="outlined-basic" placeholder='Education Credentials' onChange={(e)=>setEducation(e.target.value)} value={education} type="text" variant="outlined"
             InputProps={{
              startAdornment: <InputAdornment position="start"><SchoolRoundedIcon/></InputAdornment>,
            }}/>
             <TextField id="outlined-basic" placeholder='description' onChange={(e)=>setDescription(e.target.value)} value={description} type="text" variant="outlined"
             InputProps={{
              startAdornment: <InputAdornment position="start"><DescriptionRoundedIcon/></InputAdornment>,
            }}/>
            {/* <center> */}
            <div className='alignbut'>
                <button type="button" className="but" onClick={handleClose}>Back</button>
                   <button type="button" className="but" onClick={()=> {
                       console.log();
                       handleSubmit(name,phone_number,work,education,description)
                  setOpen(false)}
                  }>Update</button>
               </div>
               {/* </center> */}
            </div>
            </div>
    //  </div>

    
  );

  return (
    <div> 
     <Avatar className={classes.pink}>
      <EditRoundedIcon  onClick={handleOpen}/>
      </Avatar>
      
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
export default ModalProfile