import React from 'react'
import { Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom';
import { HiBadgeCheck } from "react-icons/hi";

import'./PostCard.css'

// import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import { useSelector} from 'react-redux';

import Chip from '@material-ui/core/Chip';


// import moment from "moment"



function CardCom({a}) {
//   const history = useHistory()
   
 
  const mvp = useSelector((state)=>state.post.mvp)

  
   const filter=mvp.filter((e)=>e.post_id === a._id)
   
   const d=  filter.slice(0, 3)
  

  
        
    return (
        <div>
         <br/>
         {d.length >0 ?<Chip label="Mvp" variant="outlined" size="small" style={{color:"white",borderColor:'lightgrey'}}/>:""}
         
           
            <div className={d.length >0 ?"card-mvp-top":""}>{d.map(e=><div className="head">
              <Avatar style={{marginTop:".2rem"}} alt={e.user.user_name} src={e.user.profile_picture}/>
              <div className="user-name">
                    <Link to={{pathname:'/userProfile',state:e.user}} className="user-name-link">
                   {e.user.user_name}
                   
                   </Link> 
                   {e.selected === true ?  <HiBadgeCheck   style={{color:"#76ff03",cursor:"pointer",fontSize:"30px",marginLeft:"1rem",marginTop:"-.2rem"}}/>:<></>}
                <b> <div style={{fontSize:"medium",textDecoration:"none",color:"whitesmoke"}}>{e.solution_title}</div></b>
                    </div>
                   
            </div>)}
               
                </div>
               
              
</div> 
              
        
    )
}

export default CardCom
