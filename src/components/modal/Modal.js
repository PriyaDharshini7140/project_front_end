import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { Avatar,IconButton,InputAdornment,TextField } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {useDispatch} from 'react-redux'
import {Post} from '../../redux/postActions'
import AuthService from '../../auth/AuthService';
import { useSelector } from 'react-redux';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinkIcon from '@material-ui/icons/Link';
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
 
 'Game Development',
 
 'Software Development',
 'Web Development',
 
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
const front = [
  'JavaScript',
  'Html',
  'css',
  'xml',
  'jsx',
  'bootStrap',
  'React',
  'Angular',
  'Asp.net',
'TypeScript',
 'React Native',
 
 
 ];
 const back = [
  'Java',
  'JavaScript',
  'python',
  'php',
"c#",
'express js',
'node js',
'ruby',
"c++"

 
 ];
 const datab = [
 'oracle',
 'mysql',
 'postgreSql',
 'mongoDB',
 "ibm DB2"
 
 ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getfront(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getback(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function getdb(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
overflowY:"scroll",
    position: 'relative',
    display:"flex",
    flexDirection:'column',
    width: 800,
   height:500,
    backgroundColor: theme.palette.background.paper,
    // borderRadius:"10px",
    padding: theme.spacing(2, 4, 3),
    borderColor:"transparent",
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
in:{
  width:"50%"
}
 
}));

export default function SimpleModal() {
  const classes = useStyles();
  const auth = useSelector((state)=> state.user.authorization)
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
console.log(personName);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState("");
  const [image,setImage]=useState([]);
  const [postUrl,setPostUrl]=useState([]);
  const [title,setTitle]=useState('')
  const [scope,setScope]=useState('')
  const [enhancement,setEnhancement]=useState('')
  const [frontEnd, setfrontEnd] = React.useState([]);
  const [backEnd, setbackEnd] = React.useState([]);
  const [db, setDb] = React.useState([]);
  const [link,setLink]=useState("")
  // const[progress,setProgress] = useState(0);
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
  const handleFrontend = (event) => {
    setfrontEnd(event.target.value);
  };
  const handleBackend = (event) => {
    setbackEnd(event.target.value);
  };
  const handledb = (event) => {
    setDb(event.target.value);
  };
  const handleChangeMultiple = async(event) => {
    const { files } = event.target;
     console.log("files",files);
   
    const value = [];
    
    
    for (let i = 0, l = files.length; i < l; i += 1) {
      
      var formdata = new FormData();
      formdata.append("file",files[i]);
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
        console.log("progress",data)
        
        setPostUrl((e)=>[...e,data.url])
        
        
      })
      .catch(err=>{
          console.log(err)
      })
    
    }
    
    setImage(value);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 console.log(postUrl);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      
      <TextField className={classes.in}
          id="standard-multiline-flexible"
          label="Title"
          multiline
          rowsMax={2}
          onChange={(e)=>setTitle(e.target.value)}
          variant='outlined'
          />
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Type a Message"
          multiline
          rowsMax={4}
          onChange={(e)=>setPostText(e.target.value)}
          InputProps={{
          
          
          endAdornment:
            <InputAdornment position="end">
               <input multiple accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChangeMultiple} />
      <label htmlFor="icon-button-file">
        <IconButton className={classes.camera}  aria-label="upload picture" component="span">
        <AttachFileRoundedIcon  className='modal__input__item1' />
        </IconButton>
      </label>
      
            </InputAdornment>
          }}
          />
       
       
      <br/>
     
       
           
           <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label" >Select Category</InputLabel>
        <Select
         className={classes.select}
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
      </FormControl><br/>
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Scope of this idea"
          multiline
          rowsMax={4}
          onChange={(e)=>setScope(e.target.value)}
          variant="outlined"
          />
          <br/>
          <TextField className={classes.text}
          
          label="What enhancement should be done"
          multiline
          rowsMax={4}
          onChange={(e)=>setEnhancement(e.target.value)}
          variant="outlined"
          />
   <br/>
     <div>
     Requirements :<br/>
     <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label" >Front End</InputLabel>
        <Select
         className={classes.select}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={frontEnd}
          onChange={handleFrontend}
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
          {front.map((name) => (
            <MenuItem key={name} value={name} style={getfront(name,frontEnd, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label" >BackEnd</InputLabel>
        <Select
         className={classes.select}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={backEnd}
          onChange={handleBackend}
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
          {back.map((name) => (
            <MenuItem key={name} value={name} style={getback(name,backEnd, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label" >Database</InputLabel>
        <Select
         className={classes.select}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={db}
          onChange={handledb}
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
          {datab.map((name) => (
            <MenuItem key={name} value={name} style={getdb(name, db, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="insert link(optional)"
         type="url"
         variant="outlined"
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
        
       
      </div>
     </div>
     
     
     
           <div>
        {!postUrl ? <></>:postUrl.map(e=><img src={e} style={{height:"50px"}} alt='img'/>)}
      </div>
       
         <div className="modal___button">
                <div className="modal___button_Container">
                <button type="button" className="modal_Button" onClick={handleClose}>Back</button>
                   <button type="button" className="modal_Button"  onClick={()=> {
                     if(!personName.length){
                       alert("please select category")
                     }
                     else{
                       console.log(enhancement);
                      dispatch(Post(user._id,postText,postUrl,personName,title,scope,link,enhancement,frontEnd,backEnd,db))
                      setOpen(false)
                     }
                     
                    
                    }
                  } >Post</button>
                </div>
            </div>

     
    </div>
  );

  return (
    <div>
      {auth.status === 'Verified' ? <div className="sidebar__search">
                <div className="sidebar__searchContainer"> 
              <button 
                   className="NavBar_Button" 
                onClick={handleOpen}>Add Idea</button>
              
                </div>
            </div>:<></> }
      
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
