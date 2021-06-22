import React from 'react'
import { Avatar} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom';


import'./PostCard.css'

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import { useSelector} from 'react-redux';

import Chip from '@material-ui/core/Chip';


import moment from "moment"



function CardCom({a}) {
  const history = useHistory()
   console.log("search",a);
 
  const mvp = useSelector((state)=>state.post.mvp)

  
   const filter=mvp.filter((e)=>e.post_id === a._id)
   console.log(filter);
   const d=  filter.slice(0, 3)
   console.log(d);

  
        
    return (
        <div>
         <br/>
         {d.length >0 ?<Chip label="Mvp" variant="outlined" size="small" style={{color:"white",borderColor:'lightgrey',fontFamily: "lucida Sans"}}/>:""}
         
            {/* <center style={{fontSize:"large",color:"whitesmoke",fontFamily: "lucida Sans"}}></center>   */}
            <div className={d.length >0 ?"card-mvp-top":""}>{d.map(e=><div className="head">
              <Avatar style={{marginTop:".2rem"}} alt={e.user.user_name} src={e.user.profile_picture}/>
              <div className="user-name">
                    <Link to={{pathname:'/userProfile',state:e.user}} className="user-name-link" style={{fontFamily: "lucida Sans"}}>
                   {e.user.user_name}
                   
                   </Link> 
                <b> <div style={{fontSize:"large",textDecoration:"none",color:"whitesmoke",fontFamily: "lucida Sans"}}>{e.solution_title}</div></b>
                    </div>
                   
            </div>)}
               
                </div>
               
              
</div> 
              
        
    )
}

export default CardCom
