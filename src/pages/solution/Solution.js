import React from 'react'
import {useHistory} from 'react-router-dom';
import { Avatar, Chip} from '@material-ui/core'


import {  useSelector } from 'react-redux';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

import { HiBadgeCheck } from "react-icons/hi";
import {Link} from 'react-router-dom';
import moment from 'moment';

function Solution() {
    const history = useHistory()
    // const user = useSelector((state)=> state.user.users)
    const Data = useSelector((state)=> state.post.posts)
    const state = history.location.state;
    // console.log(state);
    return (
        <div>
            <div className="wrapper-account"> 
    {Data.map((a)=> <> 
    {state.map((e)=><>{e.post_id === a._id ? <><div className='homepage__card'  key={a._id} onClick={()=>{
            history.push({pathname:"/postDetails",state:a})
          }}>
            
          <div className="head">
    
<Avatar alt={a.user.user_name} src={a.user.profile_picture}/>
                 
                 
                 <div className="user-name">
                  <Link to={{pathname:'/userProfile',state:a.user}} style={{fontFamily: "lucida Sans"}} className="user-name-link">
                 {a.user.user_name}
                 <VerifiedUserRoundedIcon className="verify"/>
                 </Link> 
                 <div style={{color:"white",fontSize:"small",fontFamily: "lucida Sans"}}>{moment(a.createdAt).format("MMMD,YYYY")}</div>
                 </div>
                
                 </div> <div class="post" key={a._id}>
               <div>
              {
              
              a.category.map((c)=>
                <Chip key={c} label={c} variant="outlined" size="small" style={{color:"white",borderColor:'lightgrey',fontFamily: "lucida Sans"}}
                onClick={()=>history.push("/search_by_category",c)}
                
                />
              )
              }
           

             </div>
            
<br/>

             <h4 style={{color:'white',fontFamily: "lucida Sans"}}>{a.idea_title}</h4>
  
               <div>
               <div
                  className='text' style={{color:'white',fontFamily: "lucida Sans"}}>{a.post_text}</div>
               </div>
           
         
               {/* <CardCom a={a}/> */}
            
               <div className="card-mvp-top">{state.map(e=><>{e.post_id === a._id ? 
               
               <div className="head">
              <Avatar style={{marginTop:".2rem"}} alt={e.user.user_name} src={e.user.profile_picture}/>
              <div className="user-name">
                    <Link to={{pathname:'/userProfile',state:e.user}} className="user-name-link">
                   {e.user.user_name}
                   
                   </Link> 
                   {e.selected === true ?  <HiBadgeCheck   style={{color:"#76ff03",cursor:"pointer",fontSize:"30px",marginLeft:"1rem",marginTop:"-.2rem"}}/>:<></>}
                <b> <div style={{fontSize:"medium",textDecoration:"none",color:"whitesmoke"}}>{e.solution_title}</div></b>
                    </div>
                   
            </div>:<></>}
            </>
            )}
               
                </div>
               

</div> 
            
            </div>
        </>:<></>}</>)}
           
       
           </>)}
    </div>
        </div>
    )
}

export default Solution
