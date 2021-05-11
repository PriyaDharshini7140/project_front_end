import React from 'react'

import Navbar from '../../components/navbar/Navbar'

import './Home.css'
import PostCard from '../../components/card/PostCard';
function Home() {
    // const {location:{state}}=props;
    // console.log(state);
    return (
       <div>
    <div className='homepage'>
        
        <PostCard/>
           </div>
       </div>
    )
}

export default Home
