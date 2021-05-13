import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import "./MenuBar.css"
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AuthService from "../../auth/AuthService"
import { useSelector } from 'react-redux';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    backgroundColor:"rgb(243, 220, 220)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state)=> state.user.users)
console.log(user);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(history);
  // const {location:{state}} =history;
  // console.log(state);
  return (
    <div className={classes.root}>
      <CssBaseline />
      
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <Avatar
             alt={user.user_name} 
            src={user.profile_picture}/>
          </IconButton>
        </Toolbar>
     
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider/>
        <List>
        <ListItem>
        <ListItemIcon><PersonRoundedIcon/></ListItemIcon>
        <ListItemIcon><Link to={{pathname:'/profile',state:user}} className="links">Profile</Link></ListItemIcon>
        </ListItem>
        <ListItem >
        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
        <ListItemIcon><Link to={{pathname:'/Account',state:user}} className="links">My Account</Link></ListItemIcon>
        </ListItem>
        <ListItem onClick={()=>{
          AuthService.logout()
          history.replace("/Sign in")
          window.location.reload()
          }}>
        <ListItemIcon><ExitToAppRoundedIcon/></ListItemIcon>
        <ListItemIcon>Logout</ListItemIcon>
        </ListItem>
        </List>
       </Drawer>
    </div>
  );
}
