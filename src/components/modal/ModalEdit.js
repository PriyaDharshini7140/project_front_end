import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { Avatar,IconButton,TextField, useTheme } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {EditPost} from '../../redux/postActions'
import MenuItem from '@material-ui/core/MenuItem';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import AuthService from '../../auth/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
 'FrontEnd Developer',
 'BackEnd Developer',
 'FullStack Developer',
'Mobile Developer',
 'Game Developer',
 'DataScientist Developer',
 'Devops Developer',
 'Software Developer',
 'Web Developer',
 'Security Developer',
 'JavaScript',
 'Html',
 'css',
 'xml',
 'jsx',
 'bootStrap',
 'React',
 'Angular',
 'Asp.net',
 'C#',
 'C',
 'C++',
 'Java',
 'Python',
 'R',
 'Ruby',
 'TypeScript',
'React Native',
'Node js',
'Scala',
'Bash/Shell/PowerShell',
'PHP',
'Kotlin',
'Assembly',
'VBA',
'Swift'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    height:500,
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
noLabel: {
  marginTop: theme.spacing(3),
},
 
}));

export default function ModalEdit({post_id,post_text}) {
  
  const auth = useSelector((state)=> state.user.authorization)
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
    console.log(post_id,post_text);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState(post_text);
  const [image,setImage]=useState('');
   const [category,setCategory]=useState('');
   const user = useSelector((state)=> state.user.users)
   console.log(user);
   const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    console.log("clicked");
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };
  const handleClose = () => {
    setOpen(false);
  };

 const post = async(post_id,postText,category)=>{
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
    console.log(data);
    dispatch(EditPost(user._id,post_id,postText,data.url,category));
    setOpen(false)
  })
  .catch(err=>{
      console.log(err)
  })

 

  
 }


  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__header">
      <Avatar className="modal__header__avatar"  alt={user.user_name} src={user.profile_picture}/>
                <div className="modal__header__body">
                {user.user_name}
                <VerifiedUserRoundedIcon className='verify'/>

                </div>
      </div>
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
        //   label="Type a Message"
          multiline
          rowsMax={4}
        value={postText}
          onChange={(e)=>setPostText(e.target.value)}
          />
         {/* <progress className="imageupload__progress" value={Progress} max="100" /> */}
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e)=>setImage(e.target.files[0])} />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.camera}  aria-label="upload picture" component="span">
        <AttachFileRoundedIcon  className='modal__input__item1' />
        </IconButton>
      </label>
      <br/>
     
                
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label" >Select Category</InputLabel>
        <Select
         
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip"/>}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
       
         <div className="modal___button">
                <div className="modal___button_Container">
                <button type="button" className="modal_Button" onClick={handleClose}>Back</button>
                   <button type="button" className="modal_Button" onClick={()=>
                    {
                      if(!personName.length){
                        alert("please select category")
                      }
                      else{
                        post(post_id,postText,personName)
                      }
                      
                    }
                    }>Post</button>
                </div>
            </div>

     
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
