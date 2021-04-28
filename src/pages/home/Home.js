import React from 'react'

import NavbarHome from '../../components/navbar/NavbarHome'

import './Home.css'
import PostCard from '../../components/card/PostCard';
function Home(props) {
    const {location:{state}}=props;
    console.log(state);
    return (
       <div>
       <NavbarHome user={state}/>
         <div className='homepage'>
        
          <PostCard user={state}/>
           </div>
       </div>
    )
}

export default Home
