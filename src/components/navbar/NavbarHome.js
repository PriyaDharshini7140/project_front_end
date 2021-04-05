import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SimpleModal from '../modal/Modal';
import PersistentDrawerRight from '../Menubar/MenuBar';




function NavbarHome() {
  const [click, setClick] = useState(false);
  
  

  return (
   
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' >
         IDEA WRAPPER
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' >
          {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
          </li>
          <li
            className='nav-item'
            
          >
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon fontSize="large"/>
                    <input placeholder="search by Category"   type="text"/>
                </div>
            </div>
               {/* <i className='fas fa-caret-down' /> */}
           
          </li>
          <li className='nav-item'>
          
          <PersistentDrawerRight/>
               </li>
          <li className='nav-item'>
         
          <SimpleModal/>
            
          </li>
        </ul>
       </nav>
       
   
  );
}

export default NavbarHome;