import { Avatar, makeStyles } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router';
import PostAcc from '../../components/card/PostAcc';
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

function Account(props) {
  let location = useLocation();
  // console.log(location);
  const {state} =location;
    console.log(state);
      const classes = useStyles();
    return (
       
        <div key={state._id}>
            <NavbarAcc user={state}/>
            <div className="account">
            <Avatar alt={state.user_name} src="/static/images/avatar/1.jpg" className={classes.large}/>
            <h1>{state.user_name}</h1>
         </div>
         <div>
            <PostAcc user={state}/>
            </div>
        </div>
    )
}

export default Account
