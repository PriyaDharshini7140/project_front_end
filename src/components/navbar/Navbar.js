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
import { Badge, IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import MenuLeft from '../Menubar/MenuLeft';
import {useSelector} from "react-redux"
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import ListIcon from '@material-ui/icons/List';

import SearchAppBar from '../Search/SearchBar';
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
const search =<>
  <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    
                    <input placeholder="search by Category" onChange={(e)=>setCategory(e.target.value)}  type="search"/>
                   <IconButton>
                   <SearchOutlinedIcon color="gray" onClick={()=>{
                     history.push("/search_by_category",category)
                   }
                  }/>
                   </IconButton>
                    </div>
            </div>
</>
  return (
    <>
   {/* <div class="wrapper-class"> */}
        {/* <div class="wrap"> */}
      
        {user === null || location.pathname === "/" || location.pathname === "/Sign up" || location.pathname === "/forgot password" ||location.pathname === "/Sign in" ? <>
         
       
            <div class="topbar-class">
              <div class="contain">
             
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
            </div>
           
        </>: user.role === 'user' && (location.pathname === "/home page" ||location.pathname === "/postDetails" || location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile")? 
        
        <>
         <div class="topbar-class">
         <div class="containHome">
           {location.pathname === "/Account" ||location.pathname === "/postDetails"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile" ? <MenuLeft/>:""}
           <h5 className="app-name"> {user.user_name}
         {auth.status === "Verified" ? 
         <VerifiedUserRoundedIcon/>:<></>}
          </h5>
         <div class="topbar-items">
         <div className='topbar-links'>
         <SearchAppBar/>
       
          </div>
         
          {location.pathname === "/home page" ? <PersistentDrawerRight user={user}/>:<></>}
          
        
         
          <SimpleModal user={user}/>
           
      </div>
      </div></div>
        
        </>
        
        :
        
        <>
        <div class="topbar-class">
         <div class="containHome">
       
        { user.role === 'admin'&& location.pathname === "/verification"  ? "":""}
        <h5 className="app-name">{user.user_name}{user.role}</h5>
        <div class="topbar-items">
        <div className='topbar-links'>
          {location.pathname === "/verification"  ? <> 
         
          <Link
              to='/verified Users'
              className='nav-links'>
                 
             user list
            
            </Link>
           
             <Link
             to='/reports'
             className='nav-links'>
               <Badge badgeContent={len} max={999} color="error">
            Reports
            </Badge>
           </Link></>
            :<Link
              to='/verification'
              className='nav-links'
              
            >
             Home page
            </Link>}
            </div>
         <div className='topbar-links'>
         
            </div>
         
            <div className='topbar-links'>
           
       <button className='navbar_button' onClick={()=>{
          AuthService.logout()
          history.replace("/Sign in")
          window.location.reload()
          }}>logout</button>
    </div>
        </div>
        </div>
        </div>

        </>}
        
        {/* </div> */}

        {/* </div> */}
       
    </>
  );
}

export default Navbar;