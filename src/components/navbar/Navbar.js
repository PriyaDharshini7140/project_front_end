import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';

import SimpleModal from '../modal/Modal';
import PersistentDrawerRight from '../Menubar/MenuBar';
import { useHistory,useLocation } from "react-router-dom";

import { Badge,Button } from '@material-ui/core';

import {useSelector} from "react-redux"
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import SearchAppBar from '../Search/SearchBar';

import {useDispatch} from 'react-redux'
import { logout } from '../../redux/Actions';
function Navbar() {
  
const dispatch = useDispatch()
  
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
  

  return (
    <>
   
      
        {user === null || location.pathname === "/" || location.pathname === "/Sign up" || location.pathname === "/forgot password" ||location.pathname === "/Sign in" ? <>
         
       
        <nav className={show ? "navbar active":"navbar"}>
              
             
                <h5  className='navbar-logo' style={{marginLeft:"-60rem"}} onClick={closeMobileMenu}> 
                
                IDEA WRAPPER <WbIncandescentOutlinedIcon/>
                <i class='fab fa-firstdraft' />
                </h5>
            </nav>
           
        </>: user.role === 'user' && (location.pathname === "/home page" || location.pathname === "/solution"  ||location.pathname === "/notifications" ||location.pathname === "/Weekly Top Picks" ||location.pathname === "/AllPosts" ||location.pathname === "/postDetails" || location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile")? 
        
        <>
         <nav className={show ? "navbar active":"navbar"}>
         <h5  className='navbar-logo'> 
         IDEA WRAPPER <WbIncandescentOutlinedIcon/>
        
                   
                <i class='fab fa-firstdraft' />
                </h5>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item' >
            <div className='nav-links' onClick={closeMobileMenu}><SearchAppBar/></div>
          
          </li>
          
          <li
            className='nav-item'
            
          >
             {location.pathname === "/home page" ? <></>:
         <Link to="/home page" onClick={closeMobileMenu} className='nav-links'>Home page</Link>
       
         }
        
          </li>
          <li className='nav-item'>
            <div className='nav-links' onClick={closeMobileMenu}><SimpleModal user={user}/></div>
          
          </li>
          <li className='nav-item' >
            <div className='nav-links' onClick={closeMobileMenu}> {user.user_name}<VerifiedUserRoundedIcon className='verify'/> </div>
          
          </li>
         
         
          
          <li >
            <div
          className='nav-links-mobile'
              onClick={closeMobileMenu}></div>
            <PersistentDrawerRight  user={user}/>
          
          </li>
        </ul>
        
        </nav>
        
        
        </>
        
        :
        
       
        <nav className={show ? "navbar active":"navbar"}>
        { user.role === 'admin'&& location.pathname === "/verification"  ? "":""}
        <h5  className='navbar-logo'> 
                
        {user.user_name}{user.role}
                <i class='fab fa-firstdraft' />
                </h5>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
          <li
            className='nav-item'
            
          >
             {location.pathname === "/verification" ? <></>:
       
        <Link
            to='/verification'
            className='nav-links'
           
          >
           Home page
          </Link>
        
       
       
         }
          </li>
          <li className='nav-item'>
          <Link
              to='/verified Users'
              className='nav-links'>
                 
             user list
            
            </Link>
          
          </li>
          <li className='nav-item'>
          <Link
             to='/reports'
             className='nav-links'>
               <Badge badgeContent={len} max={999} color="error">
            Reports
            </Badge>
           </Link>
          </li>
          
          <li className='nav-item'>
          <Button variant="contained" color="primary" style={{borderRadius:"40px"}} onClick={()=>{
          dispatch(logout())
          history.replace("/")
          // window.location.reload()
          }}>logout</Button>
          </li>
        </ul>
         
       
       
       
         
           
        </nav>
}
       
        
       
       
    </>
  );
}

export default Navbar;