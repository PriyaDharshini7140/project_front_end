import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './InitialPage.css'

function InitialPage() {
    const contactUs=
 <>
  <Link
  to='/contact us'
  className='nav-links'
 
>
  Contact us <i className='fas fa-caret-down' />
</Link>
  </>
 
const aboutUs =
<>
<Link to='/About us'
              className='nav-links'
             
            >
              About us
            </Link>
</>

const signIn=<>
 <Link
              to='/Sign in'
              className='nav-links'
              
            >
             Sign in
            </Link>
</>

    return (
        <>
        
        <div className="initialpage">
         <h4 className="initialpage__body">
          Everything begin's with an idea 
          {/* <div className="nav">
         {contactUs} {aboutUs} {signIn}
         </div>
          */}
         </h4>  
        
        </div>
        
        </>
    )
}

export default InitialPage
