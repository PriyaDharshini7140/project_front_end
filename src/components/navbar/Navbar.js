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
import { IconButton, Tooltip } from '@material-ui/core';
import MenuLeft from '../Menubar/MenuLeft';
import {useSelector} from "react-redux"
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
function Navbar() {
  const [click, setClick] = useState(false);
  const [category, setCategory] = useState('');
  const auth = useSelector((state)=> state.user.authorization)
 
 const user = useSelector((state)=> state.user.users)
 console.log(user);
let history = useHistory();
let location = useLocation()
console.log(location); 
const logo=<>
<Link to='/' className='navbar-logo' >
         IDEA WRAPPER
          <i class='fab fa-firstdraft' />
        </Link>
</>
// useEffect(() => {
 
//   return () => user
 
// }, [])

const search =<>
  <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    
                    <input placeholder="search by Category" onChange={(e)=>setCategory(e.target.value)}  type="text"/>
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
   
      
        {user === null || location.pathname === "/" || location.pathname === "/Sign up" || location.pathname === "/forgot password" ||location.pathname === "/Sign in" ? <>
         
       
            <div class="topbar-class">
              <div class="contain">
                <h5 className="app-name"> IDEA WRAPPER <WbIncandescentOutlinedIcon/></h5>
                <div class="topbar-items">
                <Tooltip title='contact us' arrow>
       <Link to='/contact us' className='topbar-links'>
              Contact us 
            </Link>
            </Tooltip>
            <Tooltip title='About us' arrow>
          <Link to='/About us' className='topbar-links'>About us</Link>
            </Tooltip>
              
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
           
        </>: user.role === 'user' && (location.pathname === "/home page" || location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile")? 
        
        <>
         <div class="topbar-class">
         <div class="containHome">
           {location.pathname === "/Account"  || location.pathname === "/search_by_category" || location.pathname === "/userProfile" ? <MenuLeft/>:""}
           <h5 className="app-name"> {user.user_name}
         {auth.status === "Verified" ? 
         <VerifiedUserRoundedIcon/>:<></>}
          </h5>
         <div class="topbar-items">
        
          
       {search}
          
         
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
          {location.pathname === "/verification"  ?  <Link
              to='/verified Users'
              className='nav-links'>
             user list
            </Link>:<Link
              to='/verification'
              className='nav-links'
              
            >
             Home page
            </Link>}
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
        
        

     
       
    </>
  );
}

export default Navbar;