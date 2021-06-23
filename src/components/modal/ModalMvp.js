import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import {Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import {useDispatch} from 'react-redux'
import {mvp} from '../../redux/postActions'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import firebase from "firebase";
import {storage} from '../../FireBase'
import { BsFillChatSquareDotsFill } from 'react-icons/bs';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    display:"flex",
    flexDirection:'column',
    width: 400,
    // height:500,
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

export default function ModalMvp({post}) {
  const classes = useStyles();
  // const storage = firebase.storage();
  const [Progress, setProgress]= useState(0);

  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = useState("");
  const [link,setLink] = useState("");
  const [url,setUrl] = useState("");
  const [image,setImage] =useState(null)
   const user = useSelector((state)=> state.user.users)
  console.log(user);
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    console.log("clicked");
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`zip/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("zip")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
console.log(url);
            dispatch(mvp(user,post,title,url))

            setProgress(0);
            
            setImage(null);
          });
      }
    );
  };

  const Mvp = useSelector((state)=> state.post.mvp)
  const filter = Mvp.filter(e=>e.user_id === user._id)
  console.log(filter);
  const body = (
    <div  className={classes.paper}>
     <h5>Add Solution</h5>
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="title"
          multiline
          rowsMax={4}
          onChange={(e)=>setTitle(e.target.value)}
          
          />
       
       
      <br/>
   
       <input
      accept=".zip"
        className={classes.input}
        id="contained-button-file"
        // multiple
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}

      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" style={{borderRadius:"20px"}} component="span">
          Upload
        </Button>
      </label>
       
        {Progress > 0 ?   
      <progress className="imageupload__progress" value={Progress} max="100" /> :<></>}
     
      <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}} onClick={()=>{
                      handleUpload()
                       setTitle("")
                       setLink("")
                       setOpen(false)
                       
                   }}>post</Button>
       </center>
        

     
    </div>
  );

  return (
    <div>
     
<Button variant='contained' style={{borderRadius:"40px"}} onClick={handleOpen} color="primary">add solution</Button>
 
 
 
  
        
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
