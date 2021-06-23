import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import {Button, TextField } from '@material-ui/core';

import {useDispatch} from 'react-redux'
import { mvpEdit} from '../../redux/postActions'

import { useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';


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

export default function ModalComment({post}) {
  const classes = useStyles();


  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title,setTitle] = useState(post.solution_title);
  const [link,setLink] = useState(post.link);
   const user = useSelector((state)=> state.user.users)
  console.log(post);
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
     
           
      <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}}onClick={()=>{
                      dispatch(mvpEdit(user._id,post._id,title,link))
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
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
