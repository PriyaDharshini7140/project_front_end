import React, { useEffect, useState } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
// import Dropdown from './Dropdown';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SimpleModal from '../modal/Modal';
import PersistentDrawerRight from '../Menubar/MenuBar';
import { useHistory,useLocation } from "react-router-dom";
import AuthService from '../../auth/AuthService';
import { Badge, IconButton, Menu, MenuItem, Tooltip,Button } from '@material-ui/core';
import MenuLeft from '../Menubar/MenuLeft';
import {useSelector} from "react-redux"
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import ListIcon from '@material-ui/icons/List';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchAppBar from '../Search/SearchBar';
import ModalNotification from '../modal/ModalNotification';
function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [category, setCategory] = useState('');
  const auth = useSelector((state)=> state.user.authorization)
 
 const user = useSelector((state)=> state.user.users)
 console.log(user);
let history = useHistory();
let location = useLocation()
console.log(location); 
const report = useSelector((state)=>state.verification.reports)
const len = report ? report.length : ""
console.log(len);
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

  return (
    <>
   {/* <div class="wrapper-class"> */}
        {/* <div class="wrap"> */}
      
        {user === null || location.pathname === "/" || location.pathname === "/Sign up" || location.pathname === "/forgot password" ||location.pathname === "/Sign in" ? <>
         
       
        <nav className={show ? "topbar-class active":"topbar-class"}>
              <div  className="containHome">
             
                <h5 className="app-name"> 
                <div class="navlist">
                <ListIcon onClick={handleClick}/>
                <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {user === null || location.pathname === "/" || location.pathname === "/forgot password" ||location.pathname === "/Sign up" ? 
          location.pathname === "/Sign in"? <Link
          to='/Sign up'
         
          
        >
         Register
        </Link>:<Link
              to='/Sign in'
             
              
            >
             Sign in
            </Link>:<Link
              to='/Sign in'
              
              
            >
             Sign in
            </Link>
        }
       
        </MenuItem>
        </Menu>
                </div>
                IDEA WRAPPER <WbIncandescentOutlinedIcon/></h5>
                <div class="topbar-items">
                
              
     {location.pathname === "/Sign in" ?
         <Tooltip title='Register' arrow>
         <Link
              to='/Sign up'
              className='topbar-links'
              
            >
             Register
            </Link>
            </Tooltip>
            :location.pathname === "/Sign up" ? 
            <Tooltip title='Login' arrow>
            <Link
              to='/Sign in'
              className='topbar-links'
              
            >
             Sign in
            </Link>
            </Tooltip>
            :<Tooltip title='Login' arrow>
            <Link
              to='/Sign in'
              className='topbar-links'
              
            >
             Sign in
            </Link>
            </Tooltip>}
          
            
            </div>
            </div>
            </nav>
           
        </>: user.role === 'user' && (location.pathname === "/home page" ||location.pathname === "/notifications" ||location.pathname === "/Weekly Top Picks" ||location.pathname === "/AllPosts" ||location.pathname === "/postDetails" || location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile")? 
        
        <>
         <nav className={show ? "topbar-class active":"topbar-class"}>
         <div class="containHome">
           {/* {location.pathname === "/Account" ||location.pathname === "/postDetails" ||location.pathname === "/Weekly Top Picks" ||location.pathname === "/AllPosts"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile" ? <MenuLeft/>:""} */}
           <h5 className="app-name">IDEA WRAPPER <WbIncandescentOutlinedIcon/></h5>
           
         
         <div class="topbar-items">
           
         
         <div className='topbar-links'>
         <SearchAppBar/>
       
          </div>
          {/* <div className='topbar-links'>
          <ModalNotification/>
    
      </div> */}
          {location.pathname === "/home page" ? <></>:<div  className='topbar-links'>
         <Link to="/home page" className="nl">Home page</Link>
       
          </div>}
          <div style={{marginTop:"-.5rem"}} className='topbar-links'>
          <SimpleModal user={user}/>
          </div>
          <div style={{marginTop:"-.5rem"}} className='topbar-links'>
           <PersistentDrawerRight  user={user}/>
           </div>
        
         
         
           
      </div>
      </div></nav>
        
        </>
        
        :
        
        <>
        <nav className={show ? "topbar-class active":"topbar-class"}>
         <div class="containHome">
       
        { user.role === 'admin'&& location.pathname === "/verification"  ? "":""}
        <h5 className="app-name">{user.user_name}{user.role}</h5>
        <div class="topbar-items">
        <div className='topbar-links'>
          {location.pathname === "/verification"  ? <> 
         
          <Link
              to='/verified Users'
              className='topbar-links'>
                 
             user list
            
            </Link>
           
             <Link
             to='/reports'
             className='topbar-links'>
               <Badge badgeContent={len} max={999} color="error">
            Reports
            </Badge>
           </Link></>
            :<Link
              to='/verification'
              className='topbar-links'
             
            >
             Home page
            </Link>}
            </div>
         
            <div className='topbar-links'>
           
       <Button variant="contained" color="primary" style={{borderRadius:"40px"}} onClick={()=>{
          AuthService.logout()
          history.replace("/Sign in")
          window.location.reload()
          }}>logout</Button>
    </div>
        </div>
        </div>
        </nav>

        </>}
        
        {/* </div> */}

        {/* </div> */}
       
    </>
  );
}

export default Navbar;