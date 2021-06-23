import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import CardCom from '../../components/card/CardCom'
import'../../components/card/PostCard.css'
import { Avatar} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import Chip from '@material-ui/core/Chip';
function WeeklyPost() {
  const history = useHistory()
    const Data = useSelector((state)=> state.post.LikeSortedPosts)
    return (
        <div className="wrapper">
           {Data.map((a)=> <>
         {moment(a.createdAt).week() === moment().week() ? 
         <div className='homepage__card'  key={a._id} onClick={()=>{
          history.push({pathname:"/postDetails",state:a})
        }}>
          
        <div className="head">
  
<Avatar style={{marginTop:".2rem"}} alt={a.user.user_name} src={a.user.profile_picture}/>
               
               
               <div className="user-name">
                <Link to={{pathname:'/userProfile',state:a.user}}  className="user-name-link">
               {a.user.user_name}
               <VerifiedUserRoundedIcon className="verify"/>
               </Link> 
               <div style={{color:"white",fontSize:"small"}}>{moment(a.createdAt).format("MMMD,YYYY")}</div>
               </div>
              
               </div> <div class="post" key={a._id}>
             <div>
            {
            
            a.category.map((c)=>
              <Chip key={c} label={c} variant="outlined" size="small" style={{color:"white",borderColor:'lightgrey'}}
              onClick={()=>history.push("/search_by_category",c)}
              
              />
            )
            }
         

           </div>
          
<br/>

           <h4 style={{color:'white'}}>{a.idea_title}</h4>

             <div>
             <div
                className='text' style={{color:'white'}}>{a.post_text}</div>
             </div>
           <CardCom a={a}/>
       
           
          
</div> 
          
          </div>:<></>
         }
           </>)}
        </div>
    )
}

export default WeeklyPost

