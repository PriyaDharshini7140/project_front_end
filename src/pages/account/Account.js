import { Avatar, makeStyles } from '@material-ui/core'
import React from 'react'
import PostCard from '../../components/card/PostCard';
import NavbarAcc from '../../components/navbar/NavbarAcc'
import './Account.css'
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginLeft:"3%",
      marginTop:"1%"
    },
  }));

function Account() {
    
      const classes = useStyles();
    return (
       
        <div>
            <NavbarAcc/>
            <div className="account">
            <Avatar alt="Priya" src="/static/images/avatar/1.jpg" className={classes.large}/>
            <h1>userName</h1>
         </div>
         <div>
            <PostCard/>
            </div>
        </div>
    )
}

export default Account
