import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import'./PostCard.css'
import AuthService from "../../auth/AuthService"
import CardCom from './CardCom';
import Services from '../../services/Services';
import { useSelector,useDispatch } from 'react-redux';
import {newFeeds} from '../../redux/postActions'
function PostCard() {
  const dispatch = useDispatch()
   const user = useSelector((state)=> state.user.users)
// console.log(user);
const post = useSelector((state)=> state.post)
console.log(post);
const [Data,setData] = useState([]);
    const [Open,setOpen] = useState(1);
    const data = Services.newFeeds() 
    console.log(data);
    useEffect(()=>{
 
     
      const Token = () => localStorage.getItem("user");
      Axios.post('http://localhost:4000/user/newFeed/',{},{
         headers:{authorization:`Bearer ${Token()}`}
      })
     .then(
         (res)=> 
           dispatch(newFeeds(res.data)) 
            )
.catch((e)=>console.log(e))
      },[])
    
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
