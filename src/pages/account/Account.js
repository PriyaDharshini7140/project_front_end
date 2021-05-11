import { Avatar, makeStyles } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router';
import PostAcc from '../../components/card/PostAcc';
import PostCard from '../../components/card/PostCard';
import NavbarAcc from '../../components/navbar/NavbarAcc'
import './Account.css'
import AuthService from "../../auth/AuthService"
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useHistory } from "react-router-dom";
import MenuLeft from '../../components/Menubar/MenuLeft';
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginLeft:"3%",
      marginTop:"1%",
      
    },
  }));

function Account() {
   const history = useHistory();
  console.log(history);
  const user = AuthService.getCurrentUser();
  console.log(user);
      const classes = useStyles();
    return (
       
        <div >
         <div>
            <PostAcc/>
            </div>
        </div>
    )
}

export default Account
