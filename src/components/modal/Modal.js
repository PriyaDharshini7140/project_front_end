import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { Avatar,IconButton,TextField } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {useDispatch} from 'react-redux'
import Services from '../../services/Services'
import {Post} from '../../redux/postActions'
import AuthService from '../../auth/AuthService';
import { useSelector } from 'react-redux';
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

export default function SimpleModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState("");
  const [image,setImage]=useState('');
  const [postUrl,setPostUrl]=useState('');
   const [category,setCategory]=useState('');
   const user = useSelector((state)=> state.user.users)
  console.log(user);
  const dispatch = useDispatch()
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

 const post = async(user_id,postText,category)=>{
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
    dispatch(Post(user_id,postText,data.url,category))
    
  })
  .catch(err=>{
      console.log(err)
  })
 }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__header">
      <Avatar className="modal__header__avatar" alt={user.user_name} src={user.profile_picture}/>
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
        <input accept="file/*" className={classes.input} id="icon-button-file" type="file" onChange={(e)=>setImage(e.target.files[0])} />
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
                   <button type="button" className="modal_Button" onClick={()=> {post(user._id,postText,category)
                  setOpen(false)}
                  }>Post</button>
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
