import React, { useEffect, useState } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import Dropdown from './Dropdown';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SimpleModal from '../modal/Modal';
import PersistentDrawerRight from '../Menubar/MenuBar';
import { useHistory,useLocation } from "react-router-dom";
import AuthService from '../../auth/AuthService';
import { IconButton } from '@material-ui/core';
import MenuLeft from '../Menubar/MenuLeft';
import {useSelector} from "react-redux"
function Navbar() {
  const [click, setClick] = useState(false);
  const [category, setCategory] = useState('');

 const user = useSelector((state)=> state.user.users)
 
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
   
      
        {user === null || location.pathname === "/" || location.pathname === "/Sign up"||location.pathname === "/Sign in" ? <>
          <nav className='navbar'>
        {logo}
        <div className='menu-icon' >
          {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
          </li>
          <li
            className='nav-item'
            
          >
       <Link
              to='/contact us'
              className='nav-links'
             
            >
              Contact us <i className='fas fa-caret-down' />
            </Link>
          </li>
          <li className='nav-item'>
          
          <Link
              to='/About us'
              className='nav-links'
             
            >
              About us
            </Link>
               </li>
          <li className='nav-item'>
         {location.pathname === "/Sign in" ? <Link
              to='/Sign up'
              className='nav-links'
              
            >
             Register
            </Link>:location.pathname === "/Sign up" ?  <Link
              to='/Sign in'
              className='nav-links'
              
            >
             Sign in
            </Link>: <Link
              to='/Sign in'
              className='nav-links'
              
            >
             Sign in
            </Link>}
          
            
          </li>
        </ul>
        </nav> 
        </>: user.role === 'user' && (location.pathname === "/home page" || location.pathname === "/Account" || location.pathname === "/profile" || location.pathname === "/search_by_category")? 
        
        <>
         <nav className='navbar'>
           {location.pathname === "/Account" || location.pathname === "/profile" || location.pathname === "/search_by_category" ? <MenuLeft/>:""}
         <div className='navbar-logo'>{user.user_name}</div> 
        <div className='menu-icon' >
          {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
          </li>
          <li
            className='nav-item'
     >
       {search}
          </li>
          <li className='nav-item'>
          {location.pathname === "/home page" ? <PersistentDrawerRight user={user}/>:""}
          
               </li>
          <li className='nav-item'>
         
          <SimpleModal user={user}/>
            
          </li>
        </ul>
        </nav>
        </>
        
        :
        
        <>
        Admin
        </>}
        
        

     
       
    </>
  );
}

export default Navbar;