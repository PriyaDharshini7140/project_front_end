import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./Modal.css"
import { Avatar,Icon,IconButton,TextField } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
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
  },
  text:{
      width:340
  }
 
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const  handleOpen = () => {
    setOpen(true);
    console.log("clicked");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal__header">
      <Avatar className="modal__header__avatar"/>
                <div className="modal__header__body">
                UserNAme
                </div>
      </div>
     {/* <div> */}
      <TextField className={classes.text}
          id="standard-multiline-flexible"
          label="Type a Message"
          multiline
          rowsMax={4}/>
        <IconButton type="file">
          <AttachFileRoundedIcon  className='modal__input__item1' />
          </IconButton>
          <IconButton>
              <AddAPhotoRoundedIcon type="image" className='modal__input__item2'/>
          </IconButton>
          {/* </div>  */}
         
         <div className="modal___button">
                <div className="modal___button_Container">
                <button type="button" className="modal_Button" onClick={handleClose}>Back</button>
                   <button type="button" className="modal_Button" onClick={handleClose}>Post</button>
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
