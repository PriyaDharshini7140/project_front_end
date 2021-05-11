import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import'./PostCard.css'
import AuthService from "../../auth/AuthService"
import CardCom from './CardCom';
import Services from '../../services/Services';

function PostCard() {
    const user = AuthService.getCurrentUser()
console.log(user);
const [Data,setData] = useState([]);
    const [Open,setOpen] = useState(1);
    const data = Services.newFeeds() 
    console.log(data);
    useEffect(()=>{
      Axios.post('http://localhost:4000/user/newFeed/').then(
        (res)=>{setData(res.data)
         console.log(res.data)
        }
       
       )
      },[])
     console.log(Open);
    return (
     <>
     {Data.map((e)=> <>
          {e.posts.length > 0 ? <>{e.posts.map((a)=>
          <CardCom e={e} a={a}/>
          )}</>
           : <>{console.log("no posts")}</>}
            </>)}
     </>
           
          
       
    )
}

export default PostCard
