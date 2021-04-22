import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { Avatar,IconButton,TextField } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
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
    width: 500,
    height:300,
    backgroundColor: theme.palette.background.paper,
    borderRadius:"20px",
    padding: theme.spacing(2, 4, 3),
    borderColor:"rgb(243, 220, 220)",
  },
  text:{
      width:340
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
}
 
}));

export default function SimpleModal({user}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState("");
  const [postUrl,setPostUrl]=useState('');
   const [up_vote,setupvote]=useState('0');
   const [down_vote,setdownvote]=useState('0');
   const [category,setCategory]=useState('');
  console.log(user);
 



  
  const  handleOpen = () => {
    setOpen(true);
    console.log("clicked");
  };
  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setPostUrl(e.target.files[0]);
  //   }
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = (a,b,c,d,e) => {
        console.log(a,b,c,d,e);
        
        Axios.post('http://localhost:4000/post/addPost',{
          user_id:user._id,
          post_text:a,
          post_url:b,
          category:c,
          up_vote:d,
          down_vote:e
        }).then(
          (res)=>console.log(res.data),
         )
        setOpen(false);
    
  }



  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__header">
      <Avatar className="modal__header__avatar"/>
                <div className="modal__header__body">
                {user.user_name}
                </div>
      </div>
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Type a Message"
          multiline
          rowsMax={4}
          onChange={(e)=>setPostText(e.target.value)}
          />
         {/* <progress className="imageupload__progress" value={Progress} max="100" /> */}
        <input accept="file/*" className={classes.input} id="icon-button-file" type="file" onChange={(e)=>setPostUrl(e.target.value)} />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.camera}  aria-label="upload picture" component="span">
        <AttachFileRoundedIcon  className='modal__input__item1' />
        </IconButton>
      </label>
      <br/>
     
        <select className="select"
         
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          <option value="0">category</option>
          <option value='web developer'>web developer</option>
          <option value='software developer'>software developer</option>
          <option value='data analyst'>data analyst</option>
          <option value='data scientist'>data scientist</option>
          <option value='developer'>developer</option>
        </select>
      
       
         <div className="modal___button">
                <div className="modal___button_Container">
                <button type="button" className="modal_Button" onClick={handleClose}>Back</button>
                   <button type="button" className="modal_Button" onClick={()=>handlePost(postText,postUrl,category,up_vote,down_vote)}>Post</button>
                </div>
            </div>

     
    </div>
  );

  return (
    <div>
      <div className="sidebar__search">
                <div className="sidebar__searchContainer"> 
              <button 
                   className="NavBar_Button" 
                onClick={handleOpen}>Add Post</button>
              
                </div>
            </div>
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
