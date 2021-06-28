import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'material-react-toastify';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ModalPassword from '../modal/ModalPassword';
import { Avatar } from '@material-ui/core';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import  { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
// import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';

import SimpleModal from '../modal/Modal';
import PersistentDrawerRight from '../Menubar/MenuBar';
import { useHistory,useLocation } from "react-router-dom";

import { Button } from '@material-ui/core';

import {useSelector} from "react-redux"
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import SearchAppBar from '../Search/SearchBar';

import {useDispatch} from 'react-redux'
import { DeleteAccount, logout, userRequest } from '../../redux/Actions';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
   
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
    const dispatch = useDispatch()
    const auth = useSelector((state)=> state.user.authorization)
 const user = useSelector((state)=> state.user.users)
//  console.log(user);
let history = useHistory();
let location = useLocation()
// console.log(location); 
const report = useSelector((state)=>state.verification.reports)
const len = report ? report.length : ""
// console.log(len);
const [click, setClick] = useState(false);
// const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  
  
  const closeMobileMenu = () => setClick(false)

const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
   
  }, []);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //   style={{ background:"lightblue"}}
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        {user && user.role === 'user' && (location.pathname === "/home page" || location.pathname === "/solution"  ||location.pathname === "/notifications" ||location.pathname === "/Weekly Top Picks" ||location.pathname === "/AllPosts" ||location.pathname === "/postDetails" || location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile")?
      <>
     <MenuItem  onClick={handleMenuClose}><b style={{fontSize:"small"}}>{user.user_name}</b></MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}><Link to={{pathname:'/Account',state:user}} style={{color:'black',textDecoration:"none"}}>My Account</Link></MenuItem>
     <MenuItem onClick={handleMobileMenuClose}>
       
       <p><SimpleModal user={user}/></p>
     </MenuItem>
      
       <MenuItem onClick={handleMobileMenuClose}>
         <Link to="/home page"  style={{color:"black"}}>Home page</Link> </MenuItem>
         {!auth || auth.status  === "Rejected"  ?<MenuItem onClick={()=>{
           handleMobileMenuClose()
               toast.success("Requested", { position: "top-center",
               autoClose: 2000,
               
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,})
         dispatch(userRequest(user._id))
         
          }}>request verification</MenuItem>:<></>}
           <ModalPassword onClose={handleMenuClose}/>
     
      <MenuItem onClose={handleMenuClose} onClick={()=>{
             handleMobileMenuClose()
             dispatch(logout())
          history.replace("/")
          // window.location.reload()
          }}>Logout
      </MenuItem>
      <MenuItem
       onClick={()=>

{
 handleMobileMenuClose()
  
  if(window.confirm("Do you want to delete your account")){
    dispatch(DeleteAccount())
   history.replace("/");
  // window.location.reload();
  }
 
 
}
}>Delete Account
       
      </MenuItem>
      </>:<> 
     
      <MenuItem onClick={handleMobileMenuClose}> <Link
             to='/verified Users'
             style={{color:"black"}}
             >
               <Badge badgeContent={len} max={999} color="error">
            user List
            </Badge>
           </Link></MenuItem> <MenuItem onClick={handleMobileMenuClose}> <Link
             to='/reports'
             style={{color:"black"}}
             >
               <Badge badgeContent={len} max={999} color="error">
            Reports
            </Badge>
           </Link></MenuItem><MenuItem  onClick={()=>{
             handleMobileMenuClose()
             dispatch(logout())
          history.replace("/")
          // window.location.reload()
          }}>Logout</MenuItem></>
      }
      
       
    </Menu>

  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" style={{background:"rgba(0, 0,0,0.03)"}}>
        <Toolbar>
        
           <div className={classes.sectionMobile}>
             
               <Typography className={classes.title} variant="h6" noWrap>
          IDEA WRAPPER <WbIncandescentOutlinedIcon/>
          </Typography>
          {user ? 
          user.role==="admin" && ( location.pathname === "/verification" || location.pathname === "/verified Users" || location.pathname === "/reports") ? 
        <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
         <MenuIcon/>
      </IconButton>:
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
               <Avatar style={{cursor:"pointer",marginLeft:"-1rem"}}
             alt={user.user_name} 
            src={user.profile_picture}/>
            </IconButton>:<></>}
          </div>
          {user === null || location.pathname === "/" || location.pathname === "/Sign up" || location.pathname === "/forgot password" ||location.pathname === "/Sign in" ? 
          <Typography  variant="h6" noWrap>
          IDEA WRAPPER <WbIncandescentOutlinedIcon/>
          </Typography>:<> {user.role === 'user' && (location.pathname === "/home page" || location.pathname === "/solution"  ||location.pathname === "/notifications" ||location.pathname === "/Weekly Top Picks" ||location.pathname === "/AllPosts" ||location.pathname === "/postDetails" || location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile")?
        <>
        <Typography className={classes.title} variant="h6" noWrap>
         IDEA WRAPPER <WbIncandescentOutlinedIcon/>
         </Typography> <div className={classes.sectionMobile}> <SearchAppBar/></div>
  
         <div className={classes.grow} />
          <div className={classes.sectionDesktop} >
          <div> <SearchAppBar/></div>
         <div style={{marginLeft:"1rem",marginTop:".3rem"}}>{location.pathname === "/home page" ? <></>:
         <Link to="/home page" onClick={closeMobileMenu} className='nav-links'>Home page</Link>
       
         }</div>
          <div style={{marginLeft:"1rem",marginTop:".3rem"}}><SimpleModal user={user}/></div>
          <div style={{marginLeft:"1rem",marginTop:".3rem"}}>{user.user_name}<VerifiedUserRoundedIcon className='verify'/></div>
          <div style={{marginLeft:"1rem",marginRight:"1.5rem"}}><PersistentDrawerRight  user={user}/></div>
          </div>
          </>
          :<> <>
          <Typography className={classes.title} variant="h6" noWrap>
          {user.user_name}{user.role}
           </Typography>
           <div className={classes.sectionMobile}><Typography  variant="h6" noWrap>
          {user.user_name}{user.role}
           </Typography></div>
           <div className={classes.grow} />
            <div className={classes.sectionDesktop} >
                
           <div style={{marginLeft:"1rem",marginTop:".3rem"}}> {location.pathname === "/verification" ? <></>:
       
       <Link
           to='/verification'
           className='nav-links'
          
         >
          Home page
         </Link>
       
      
      
        }</div>
            <div style={{marginLeft:"1rem",marginTop:".3rem"}}> <Link
              to='/verified Users'
              className='nav-links'>
                 
             user list
            
            </Link>
          </div>
            <div style={{marginLeft:"1rem",marginTop:".3rem"}}> <Link
             to='/reports'
             className='nav-links'>
               <Badge badgeContent={len} max={999} color="error">
            Reports
            </Badge>
           </Link></div>
            <div style={{marginLeft:"1rem",marginRight:"1.5rem"}}><Button variant="contained" color="primary" style={{borderRadius:"40px"}} onClick={()=>{
          dispatch(logout())
          history.replace("/")
          // window.location.reload()
          }}>logout</Button></div>
            </div>
            </></>
         
}</>
         }
          
          
         
         
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}
