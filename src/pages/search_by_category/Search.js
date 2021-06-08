import React from 'react'
import { useSelector } from 'react-redux';
import CardCom from '../../components/card/CardCom';
import {useHistory} from 'react-router-dom'
function Search(props) {
  const user = useSelector((state)=> state.user.users)
  console.log(user);
  const history = useHistory()
    const search = history.location.state
    console.log(search);
;
   const data = useSelector((state)=> state.post.LikeSortedPosts)
   
  

    return (
        <div>
   {data.map(e=>e.category.map(s=>
     s.toLowerCase().replace(/\s/g,'').includes(search.toLowerCase().replace(/\s/g,'')) ?<CardCom  a={e}/>:<></>
     
   ))}
       </div>
       
    )
}

export default Search
