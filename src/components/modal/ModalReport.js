import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import {Button,TextField } from '@material-ui/core';

import {useDispatch} from 'react-redux'

import { useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { reports } from '../../redux/verficationAction';



const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display:"flex",
    flexDirection:'column',
    width: 400,
    marginLeft:"2rem",
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

export default function ModalReport({postId}) {
  const classes = useStyles();



  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState("");

   const user = useSelector((state)=> state.user.users)
  // console.log(user);
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    // console.log("clicked");
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 

  const body = (
    <div  className={classes.paper}>
      <h5>Add Report</h5>
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="why do you want to report this post"
          multiline
          rowsMax={4}
          onChange={(e)=>setPostText(e.target.value)}
          
          />
       
       
      <br/>
     
       
      <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}} onClick={()=>{
                      dispatch(reports(user._id,postId,postText))
                       setPostText("")
                       setOpen(false)
                   }}>post</Button>
       </center> 
           
     
       
         

     
    </div>
  );

  return (
    <div>
      <MenuItem onClick={handleOpen}>Report</MenuItem>
      
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
