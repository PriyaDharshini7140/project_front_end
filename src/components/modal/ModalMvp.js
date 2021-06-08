import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import {Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import {useDispatch} from 'react-redux'
import {mvp, Post} from '../../redux/postActions'
import AuthService from '../../auth/AuthService';
import { useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { reports } from '../../redux/verficationAction';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display:"flex",
    flexDirection:'column',
    width: 600,
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

 
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = useState("");
  const [link,setLink] = useState("");
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
 

  const body = (
    <div style={modalStyle} className={classes.paper}>
      
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="title"
          multiline
          rowsMax={4}
          onChange={(e)=>setTitle(e.target.value)}
          
          />
       
       
      <br/>
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="link"
          multiline
          type="url"
          rowsMax={4}
          onChange={(e)=>setLink(e.target.value)}
          InputProps={{
          
          
            startAdornment:
              <InputAdornment position="start">
                <IconButton>
              
          <LinkIcon/>
          </IconButton>
        
              </InputAdornment>
            }}
          />
       
       
           
           
     
       
         <div className="modal___button">
                <div className="modal___button_Container">
                <button type="button" className="modal_Button" onClick={handleClose}>Back</button>
                   <button type="button" className="modal_Button" onClick={()=>{
                      dispatch(mvp(user._id,post._id,title,link))
                       setTitle("")
                       setLink("")
                       setOpen(false)
                   }}>Post</button>
                </div>
            </div>

     
    </div>
  );

  return (
    <div>
     <Button variant='outlined' style={{borderRadius:"20px"}} onClick={handleOpen} color="primary">add solution</Button>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
