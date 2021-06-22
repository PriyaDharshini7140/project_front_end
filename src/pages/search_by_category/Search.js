import React from 'react'
import { useSelector } from 'react-redux';
import CardCom from '../../components/card/CardCom';
import {useHistory} from 'react-router-dom'
import './Search.css'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import CardCom from '../../components/card/CardCom'
// import './Allpost.css'
// import { useSelector} from 'react-redux';
import { Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom';

// import './Home.css'
import moment from 'moment';
// import { Link } from 'react-router-dom';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';

// import { useSelector} from 'react-redux';

import Chip from '@material-ui/core/Chip';

function Search(props) {
  const user = useSelector((state)=> state.user.users)
  console.log(user);
  const history = useHistory()
    const search = history.location.state
    console.log(search);
;
   const data = useSelector((state)=> state.post.LikeSortedPosts)
   
  

    return (
        <div className="wrapper-search">
   {data.map(a=>a.category.map(s=>
     s.toLowerCase().replace(/\s/g,'').includes(search.toLowerCase().replace(/\s/g,'')) ?<><div className='homepage__card'  key={a._id} onClick={()=>{
      history.push({pathname:"/postDetails",state:a})
    }}>
      
    <div className="head">

<Avatar style={{marginTop:".2rem"}} alt={a.user.user_name} src={a.user.profile_picture}/>
           
           
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
       <CardCom a={a}/>
   
       
      
</div> 
      
      </div></>:<></>
     
   ))}
       </div>
       
    )
}

export default Search
