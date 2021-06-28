import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import {Button, TextField } from '@material-ui/core';
import {storage} from '../../FireBase'
import {useDispatch} from 'react-redux'
import { mvpEdit} from '../../redux/postActions'

import { useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';




const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display:"flex",
    flexDirection:'column',
    width: 400,
    // height:500,
    backgroundColor: theme.palette.background.paper,
    borderRadius:"20px",
    padding: theme.spacing(2, 4, 3),
    borderColor:"rgb(243, 220, 220)",
    marginLeft:"-3rem"
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

export default function ModalMvpEdit({post}) {
  const classes = useStyles();


  const [Progress, setProgress]= useState(0);
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = useState(post.solution_title);
  const [link,setLink] = useState(post.link);
  const [image,setImage] =useState(post.link)
   const user = useSelector((state)=> state.user.users)
  // console.log(post);
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    // console.log("clicked");
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  const Filevalidation = (e) => {
    var maxSize = 4 * 1024 ;
    // console.log("maxSize",maxSize);
    const { files } = e.target;
    // console.log("files",files);
       if (files && files[0]) {
                    var fsize = files[0].size/1024;
                    // console.log("fileSize",fsize);
                    if(fsize > maxSize) {
                       alert('Maximum file size exceed');
                       return false;
                    } else {
                      setImage(files[0])
                    }
         }
    
}
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
           
// console.log(url);

            dispatch(mvpEdit(user,post,title,url))

            setProgress(0);
            
            setImage(null);
          });
      }
    );
  };
  const body = (
    <div  className={classes.paper}>
       <h5>Edit solution</h5>
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="title"
          multiline
          rowsMax={4}
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          />
       
       
      <br/>
     
      <input
      accept=".zip"
        className={classes.input}
        id="contained-button-file"
        // multiple
        type="file"
        onChange={Filevalidation}

      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" style={{borderRadius:"20px"}} component="span">
          Upload
        </Button>
      </label>
       
           
      <progress className="imageupload__progress" value={Progress} max="100" />     
      <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}}onClick={()=>{
                     handleUpload()
                       setTitle("")
                       setLink("")
                       setOpen(false)
                   }}>update</Button>
       </center>
        
       
       

     
    </div>
  );

  return (
    <div>
     
     <MenuItem onClick={handleOpen}>edit</MenuItem>
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
