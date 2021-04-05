import React from 'react'

import NavbarHome from '../../components/navbar/NavbarHome'

import './Home.css'
import PostCard from '../../components/card/PostCard';
function Home() {
    return (
       <div>
       <NavbarHome/>
         <div className='homepage'>
        
          <PostCard/>
           </div>
       </div>
    )
}

export default Home
