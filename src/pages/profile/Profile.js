import React from 'react'
import "./Profile.css"
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
      alignSelf:"center"
    },
  }));

function Profile() {
    const classes = useStyles();
    return (
        <div className="profile">
            <div className="profile__body">
                <div className="profile__body__left">
               <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}/>
               <div className="profile__body__right">
                <h2>Update your profile</h2> 
              </div>
               <div className="profileImage">
               <input type="file"/>
               </div>
               </div>
             
              
                   <Container className="container">
              about me
        </Container>
              
             
            </div>
           
        </div>
    )
}

export default Profile
