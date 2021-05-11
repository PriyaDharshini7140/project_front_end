import React,{useEffect} from 'react'
import axios from "axios";
// import Services from "../../services/Services"
function UserProfile(props) {
    const {location:{state}}=props;
    console.log(state);
  
 useEffect(() => {
    axios.post('http://localhost:4000/post/addPost',{
         _id:state
        }).then(
          (res)=>console.log(res.data),
         )
 }, [])
    return (
        <div>
            userprofile
        </div>
    )
}

export default UserProfile
