
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
import { Avatar ,Badge} from '@material-ui/core';
import {useDispatch } from 'react-redux';
import { userRequest } from '../../redux/Actions';
import NotificationsIcon from '@material-ui/icons/Notifications';
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

export default function ModalNotification() {
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
      <Badge badgeContent={1} 
      
      color="secondary">
        <NotificationsIcon style={{color:"white",cursor:"pointer"}} ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}/>
 
      </Badge>
     
        
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}  id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      {user.education === "" && user.work === "" && user.description === "" && user.phone_number === "" ?<MenuItem onClick={handleClose}>hi update your profile</MenuItem>:<></>}
                  {auth ? <MenuItem onClick={handleClose}>Your Account has been verified</MenuItem>:<MenuItem onClick={handleClose}>Request for Verification </MenuItem>}
                 
                  </MenuList>
                  
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
