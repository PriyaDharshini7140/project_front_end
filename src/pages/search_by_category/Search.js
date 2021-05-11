import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardCom from '../../components/card/CardCom';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AuthService from '../../auth/AuthService';
import MenuLeft from '../../components/Menubar/MenuLeft';
function Search(props) {
    console.log(props.history.location.state);
    const [Data,setData] = useState([]);
    const [Open,setOpen] = useState(1);
    const user = AuthService.getCurrentUser()
    useEffect(()=>{
      axios.post('http://localhost:4000/post/getPostByCategory/',{
          category:props.history.location.state
      }).then(
        (res)=>{setData(res.data)
         console.log(res.data)
        }
       
       )
      },[props.history.location.state])
    return (
        <div>
        <div>
        {Data.map((e)=> <>
          {e.posts.length > 0 ? <>{e.posts.map((a)=>
          <CardCom e={e} a={a}/>
          )}</>
           : <>
           {/* <CameraAltIcon fontSize="large"/>
           no such post is found */}
           {console.log("no posts")}
           </>}
            </>)}
           </div>
       </div>
       
    )
}

export default Search
