import React from 'react'
import { Button, Card } from '@material-ui/core';
import './UserSIgnup.css'
import { Link } from 'react-router-dom';

function UserSIgnup(props) {
    console.log(props);
    return (
        <div className='user-signup'>
        <Card className='user-signup-card'>
            <center>
                <h3 >
                    <b className="user-signup-cardAction">
           Welcome to Idea Wrapper
   </b> </h3></center>
           
     <b>UserName</b>
                <input  className='user-signup-card-input' placeholder="Enter userName"/> <br/>
       
        <b>Email</b>          <input  className='user-signup-card-input' placeholder="Enter  email id"/> <br/>

        
         <b>Password</b>      <input  className='user-signup-card-input' placeholder="Enter password"/> <br/>

        
         <Button className='user-signup-card-button' onClick={()=>{props.history.goBack()}}>Register</Button><br/>
         <center>
       <Link to='/Sign in'>Already a User</Link>  
               </center>
           
        </Card>
     
    </div>
       
    )
}

export default UserSIgnup