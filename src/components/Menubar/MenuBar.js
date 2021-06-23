
import React from 'react';
import ModalPassword from '../modal/ModalPassword';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory ,useLocation} from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthService from '../../auth/AuthService';
import { Avatar } from '@material-ui/core';
import {useDispatch } from 'react-redux';
import { userRequest } from '../../redux/Actions';

import { ToastContainer, toast } from 'material-react-toastify';
  import 'material-react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  paper: {
    // marginRight: theme.spacing(-1),
  },
}));

export default function PersistentDrawerRight() {
  const auth = useSelector((state)=> state.user.authorization)
 
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state)=> state.user.users)
  const classes = useStyles();
  // const user = useSelector((state)=> state.user.users)
  const dispatch = useDispatch()
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      
      <div>
      <Avatar
      style={{cursor:"pointer"}}
             alt={user.user_name} 
            src={user.profile_picture}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            />
        
        <Popper open={open} style={{marginTop:".3rem"}} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{width:"130px"}}>
                <ClickAwayListener onClickAway={handleClose}>
                  {location.pathname === "/home page" ?<MenuList autoFocusItem={open}  id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}><b style={{fontSize:"small"}}>{user.user_name}</b></MenuItem>
                  <MenuItem onClick={handleClose}><Link to={{pathname:'/Account',state:user}} style={{color:'black',textDecoration:"none"}}>My Account</Link></MenuItem>
          <MenuItem onClick={()=>{
          
          AuthService.logout()
          history.replace("/")
          window.location.reload()
          }}>Logout</MenuItem>
                  </MenuList>:<MenuList autoFocusItem={open} id="menu-list-grow"  onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}><b style={{fontSize:"small"}}>{user.user_name}</b></MenuItem>
                  <ModalPassword onClick={handleClose}/>
             {!auth || auth.status  === "Rejected"  ?<MenuItem onClick={()=>{
               toast.success("Requested", { position: "top-center",
               autoClose: 2000,
               
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,})
         dispatch(userRequest(user._id))
         
          }}>request verification</MenuItem>:<></>}
           <ToastContainer position="top-center"
         autoClose={2000}
         hideProgressBar
         
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover/>

<MenuItem onClick={()=>

        {
          
          if(window.confirm("Do you want to delete your account")){
           AuthService.delete();
           history.replace("/");
          window.location.reload();
          }
         
         
        }
      }>Delete Account</MenuItem>
          <MenuItem onClick={()=>{
             
          AuthService.logout()
          history.replace("/")
          window.location.reload()
          }}>Logout</MenuItem>
          
                  </MenuList>}
                  
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
