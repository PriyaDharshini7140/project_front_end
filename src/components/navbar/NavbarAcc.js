import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SimpleModal from '../modal/Modal';
import PersistentDrawerRight from '../Menubar/MenuBar';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Avatar } from '@material-ui/core';
import { useHistory } from "react-router-dom";



function NavbarAcc({user}) {
  const [click, setClick] = useState(false);
  const history = useHistory();
  console.log(history);

  return (
   
      <nav className='navbar'>
        <Link to='/profile' className='navbar-logo' >
         Hello {user.user_name}
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
          </li>
          <li className='nav-item1'>
          {/* <Link
              to='/home page'
              className='nav-links'
             
            > */}
                 <HomeRoundedIcon fontSize='large' onClick={()=>history.goBack()}/>
            <i className='fas fa-caret-down' />
            {/* </Link> */}
          </li>
          {/* <li className='nav-item'>
         
          <Avatar alt={user.user_name} src="/static/images/avatar/1.jpg"/>
               </li> */}
          
        </ul>
       </nav>
       
   
  );
}

export default NavbarAcc;