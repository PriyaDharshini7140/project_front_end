import React, { useState } from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import Dropdown from './Dropdown';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' >
         IDEA WRAPPER
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' >
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
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
            {dropdown}
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
            <Link
              to='/Sign in'
              className='nav-links'
              
            >
             Sign in
            </Link>
          </li>
        </ul>
       </nav>
       
    </>
  );
}

export default Navbar;