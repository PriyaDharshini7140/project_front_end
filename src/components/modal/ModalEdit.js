import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { IconButton,InputAdornment,TextField,Button } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {useDispatch} from 'react-redux'

import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';

import {EditPost} from '../../redux/postActions'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const names = [
 
  'Education Apps',
  'Rating and Review Application',
  'OTT(Over-the-top) Platform Application',
  'Real-Time Communication Application',
  'Question and Answer Platform',
  'social Media',
  'E-Commerce',
  'Fantasy Sports',
  'Expense/Account Management',
  'Content Management System',
  'Algorithm Visualizer Application',
  'Project Management Application',
  'Note-taking Application',
  'Matchmaking Application',
  'Blog Application'
 ];

const useStyles = makeStyles((theme) => ({
  paper: {
// overflowY:"scroll",
    position: 'relative',
    display:"flex",
    flexDirection:'column',
    width: 800,
  //  height:500,
    backgroundColor: theme.palette.background.paper,
    borderRadius:"20px",
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
const filter = createFilterOptions()
export default function ModalEdit({post}) {
  const classes = useStyles();
  console.log(post);

  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState(post.post_text);
  const [image,setImage]=useState([]);
  const [postUrl,setPostUrl]=useState([]);
  const [title,setTitle]=useState(post.idea_title)
  const [scope,setScope]=useState(post.scope)
  const [enhancement,setEnhancement]=useState(post.enhancement)
  const [value, setValue] = React.useState(null);
  const [link,setLink]=useState(post.link)
  // const[progress,setProgress] = useState(0);
   const user = useSelector((state)=> state.user.users)
  console.log(user);
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    console.log("clicked");
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
 function validateCategory() {
  if(!value)
  return("Category not selected ")
}
  const body = (
    <div className={classes.paper}>
       <h5>Edit idea</h5>
      <TextField className={classes.in}
          id="standard-multiline-flexible"
          label="Title"
          multiline
          rowsMax={2}
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          variant='outlined'
          />
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Type a Message"
          multiline
          rowsMax={4}
          value={postText}
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
     
      <Autocomplete
        multiple
        id="tags-outlined"
        options={names}
        
        filterSelectedOptions
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue(newValue
            );
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue( newValue.inputValue
            );
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push(
           params.inputValue,
              //  `Add "${params.inputValue}"`,
            );
          }
  
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
       
      
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option;
        }}
        renderOption={(option) => option}
        
        renderInput={(params) => (
          <TextField
          helperText={validateCategory()}
            {...params}
            variant="outlined"
            label="Select Category"
            // placeholder="Favorites"
          />
        )}
      />

           
     <br/>
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Scope of this idea"
          multiline
          rowsMax={4}
          value={scope}
          onChange={(e)=>setScope(e.target.value)}
          variant="outlined"
          />
          <br/>
          <TextField className={classes.text}
          
          label="What enhancement should be done"
          multiline
          value={enhancement}
          rowsMax={4}
          onChange={(e)=>setEnhancement(e.target.value)}
          variant="outlined"
          />
   <br/>
    
          
      <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}} onClick={()=> {
                    dispatch(EditPost(user._id,post._id,postText,title,scope,enhancement,value))
                    setOpen(false)
                     
                    
                    }
                  }>post</Button>
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

