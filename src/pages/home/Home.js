
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import'../../components/card/PostCard.css'
import AuthService from "../../auth/AuthService"
import CardCom from '../../components/card/CardCom';
import Services from '../../services/Services';
import { useSelector,useDispatch } from 'react-redux';
import {newFeeds} from '../../redux/postActions'
import './Home.css'
import PostCard from '../../components/card/PostCard';
import axios from 'axios';
function Home() {
    const dispatch = useDispatch()
   const user = useSelector((state)=> state.user.users)
// console.log(user);
const Data = useSelector((state)=> state.post.posts)
console.log(Data);

    const [Open,setOpen] = useState(1);
    
    useEffect(()=>{
        const Token = () => localStorage.getItem("user");
     return axios.post('http://localhost:4000/user/newFeed/',{},{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> {
            console.log(res.data)
            dispatch(newFeeds(res.data))
         })
.catch((e)=>console.log(e))
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
