import React from 'react'
import { Button, Card } from '@material-ui/core';
import './UserLogin.css'
import { Link } from 'react-router-dom';

function UserLogin(props) {
    console.log(props);
    return (
        
        <div className='user-login'>
            <Card className='user-login-card'>
                <center><h3>
                    <b className="user-login-cardAction">
               Hi Welcome Back !!!!
       </b> </h3></center>
           
            <b>Email</b>          <input  className='user-login-card-input' placeholder="Enter your email id"/> <br/>

            
             <b>Password</b>      <input  className='user-login-card-input' placeholder="Enter your password"/> <br/>
   
            
             <Button className='user-login-card-button' onClick={()=>{props.history.push('/home page')}}>login</Button> <br/>
             <Button className='user-login-card-button' onClick={()=>{props.history.goBack()}}>Back</Button> <br/>
              <center>
       <Link to='/Sign up'>Create a Account</Link>  
               </center>
            </Card>
         
        </div>
    )
}

export default UserLogin
