
import React from 'react'

import'../../components/card/PostCard.css'

import CardCom from '../../components/card/CardCom';

import { useSelector} from 'react-redux';
import { Avatar} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom';

import './Home.css'
import moment from 'moment';
// import { Link } from 'react-router-dom';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

// import { useSelector} from 'react-redux';

import Chip from '@material-ui/core/Chip';
import SearchAppBar from '../../components/Search/SearchBar';


// import moment from "moment"


function Home() {
const Data = useSelector((state)=> state.post.posts)
const Filter = Data.filter((e)=>e.mvp.length > 0)
const D =  Filter.slice(0, 3)
const data = useSelector((state)=> state.post.LikeSortedPosts)
const F = data.filter((e)=>e.mvp.length > 0);
const week = F.filter((e)=>moment(e.createdAt).week() === moment().week())
// console.log(week);
const d=  week.slice(0, 3)
// console.log(d);
const history = useHistory()

    return (
      <>
      
      <div className="home-link"><Link to='/AllPosts' className="link-home" >Explore More Idea's</Link></div>
    <div class="wrapper-home">
     {D.map((a)=> <> <div className='homepage__card'  key={a._id} onClick={()=>{
              history.push({pathname:"/postDetails",state:a})
            }}>
              
            <div className="head">
      
 <Avatar style={{marginTop:".2rem"}} alt={a.user.user_name} src={a.user.profile_picture}/>
                   
                   
                   <div className="user-name">
                    <Link to={{pathname:'/userProfile',state:a.user}} className="user-name-link">
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
              
              </div></>)}
     
            </div>
          
            <div className="home-link"><Link to='/Weekly Top Picks' className="link-home">Weekly Top Picks</Link></div>
          
           <div class="wrapper-home">
    
           {d.map((a)=> <>
         
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
              
              </div>
       
           </>)}
          
           </div>
           <div className="home-link"><Link to='/AllPosts' className="link-home" >Search by category</Link><div className="s"><SearchAppBar/></div></div>
           
    <div class="wrapper-home">
     {D.map((a)=> <><div className='homepage__card'  key={a._id} onClick={()=>{
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

               <h4 style={{color:'white',fontFamily: "lucida Sans"}}>{a.idea_title}</h4>
    
                 <div>
                 <div
                    className='text' style={{color:'white'}}>{a.post_text}</div>
                 </div>
               <CardCom a={a}/>
           
               
              
</div> 
              
              </div></>)}
     
            </div>
          
         
       </>
    )
}

export default Home
