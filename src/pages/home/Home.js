
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import'../../components/card/PostCard.css'
import AuthService from "../../auth/AuthService"
import CardCom from '../../components/card/CardCom';

import { useSelector,useDispatch } from 'react-redux';
import {newFeeds} from '../../redux/postActions'
import './Home.css'

import axios from 'axios';
function Home() {
    const dispatch = useDispatch()
   const user = useSelector((state)=> state.user.users)
// console.log(user);
const Data = useSelector((state)=> state.post.posts)
// console.log(Data);
const data = useSelector((state)=> state.post)
console.log(data);
    const [Open,setOpen] = useState(1);
    
    useEffect(()=>{
        
    },[])
    
    return (
       <div>
    <div className='homepage'>
    
     {Data.map((e)=> <>
          
          <CardCom  a={e}/>
        
            </>)}
     
           </div>
       </div>
    )
}

export default Home
