import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { IconButton,InputAdornment,TextField,Button,Tooltip } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {useDispatch} from 'react-redux'
import {Post} from '../../redux/postActions'

import { useSelector } from 'react-redux';

// import { useTheme } from '@material-ui/core/styles';

import LinkIcon from '@material-ui/icons/Link';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'



;

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


const useStyles = makeStyles((theme) => ({
  paper: {
// overflowY:"scroll",
    position: 'relative',
    display:"flex",
    flexDirection:'column',
minWidth:"200px",

  
    backgroundColor: theme.palette.background.paper,
    borderRadius:"10px",
    padding: theme.spacing(2, 4, 3),
    borderColor:"transparent",
  
  // marginLeft:"6rem",
  // marginTop:"-4rem",
   
    
  },
  text:{
      width:"70%"
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
select:{width:"50%"},
noLabel: {
  marginTop: theme.spacing(3),
},
in:{
  // width:"20%",
  display:"flex",
  flexDirection:"row"
}
 
}));

const filter = createFilterOptions()
export default function SimpleModal() {
  const classes = useStyles();
  const auth = useSelector((state)=> state.user.authorization)
  // const theme = useTheme();
  

  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [postText,setPostText] = useState("");
  const [image,setImage]=useState([]);
  const [postUrl,setPostUrl]=useState([]);
  const [title,setTitle]=useState('')
  const [scope,setScope]=useState('')
  const [enhancement,setEnhancement]=useState('')
  const [frontEnd, setfrontEnd] = React.useState(null);
  const [backEnd, setbackEnd] = React.useState(null);
  const [db, setDb] = React.useState(null);
  const [link,setLink]=useState("")
  const [value, setValue] = React.useState(null);
  // const[progress,setProgress] = useState(0);
   const user = useSelector((state)=> state.user.users)
  // console.log(user);
  const dispatch = useDispatch()
  const  handleOpen = () => {
    setOpen(true);
    // console.log("clicked");
  };
 
  
  const handleChangeMultiple = async(event) => {
    const { files } = event.target;
    //  console.log("files",files);
   
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
        // console.log("progress",data)
        
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
 function validateTitle() {
  if(!title)
  return("Title Required")
}
function validateDescription() {
  if(!postText)
  return("Field required")
}
function validateCategory() {
  if(!value)
  return("Category not selected ")
}
function validateScope() {
  if(!scope)
  return("Field required")
}
function validateEnhance() {
  if(!enhancement)
  return("Field required")
}
  const body = (
    <div className={classes.paper}>
      <h5>Add idea</h5>
      <div>
      <TextField 
          id="standard-multiline-flexible"
          label="Title"
          multiline
          rowsMax={2}
          onChange={(e)=>setTitle(e.target.value)}
          variant='outlined'
          helperText={validateTitle()}
          />
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Type a Message"
          multiline
          rowsMax={4}
          variant='outlined'
          helperText={validateDescription()}
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
          </div>
       
       
      <br/>
     
       
           
          <div  className={classes.in}>

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

   
      
      <TextField 
      // style={{margin:"1rem"}}
          id="standard-multiline-flexible"
          label="Scope of this idea"
          multiline
          rowsMax={4}
          helperText={validateScope()}
          onChange={(e)=>setScope(e.target.value)}
          variant="outlined"
          />
          {/* <br/> */}
          <TextField  
           helperText={validateEnhance()}
       
          label="What enhancement should be done"
          multiline
          rowsMax={4}
          onChange={(e)=>setEnhancement(e.target.value)}
          variant="outlined"
          />
        
   </div>
     <div>
     Requirements :<br/>
     <div style={{display:'flex',justifyContent:"space-evenly"}}>
    
     <Autocomplete
        multiple
        id="tags-outlined"
        options={front}
        
        filterSelectedOptions
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setfrontEnd(newValue
            );
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setfrontEnd( newValue.inputValue
            );
          } else {
            setfrontEnd(newValue);
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
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Front-end"
            // placeholder="Favorites"
          />
        )}
      /> 
     
       <Autocomplete
      multiple
      id="tags-outlined"
      options={back}
      
      filterSelectedOptions
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setbackEnd(newValue
          );
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setbackEnd( newValue.inputValue
          );
        } else {
          setbackEnd(newValue);
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
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Back-end"
          // placeholder="Favorites"
        />
      )}
    /> 
   
     <Autocomplete
    multiple
    id="tags-outlined"
    options={datab}
    
    filterSelectedOptions
    onChange={(event, newValue) => {
      if (typeof newValue === 'string') {
        setDb(newValue
        );
      } else if (newValue && newValue.inputValue) {
        // Create a new value from the user input
        setDb( newValue.inputValue
        );
      } else {
        setDb(newValue);
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
    style={{ width: 300 }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        label="DataBase"
        // placeholder="Favorites"
      />
    )}
  />
      
      </div>
      <br/> 
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
      <center>
      <Button variant="contained" color="primary" onClick={handleClose} style={{borderRadius:"20px"}}>back</Button>
       <Button variant="contained" color="primary" style={{borderRadius:"20px"}} onClick={()=> {
                     if(!value.length){
                       alert("please select category")
                     }
                     else{
                       console.log(enhancement);
                      dispatch(Post(user._id,postText,postUrl,value,title,scope,link,enhancement,frontEnd,backEnd,db))
                      setOpen(false)
                     }
                     
                    
                    }
                  }disabled={validateCategory(),validateTitle(),validateDescription(),validateEnhance(),validateScope()}>post</Button>
       </center>
        
     
    </div>
  );

  return (
    <div>
      {auth.status === 'Verified' ? <div>
                <div> 
                  <Tooltip title="Click to Add Idea" arrow>
              <div className="nl" style={{cursor:"pointer"}}
                  //  className="NavBar_Button" 
                onClick={handleOpen}>Add Idea</div>
              </Tooltip>
                </div>
                
            </div>:<></> }
      
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
