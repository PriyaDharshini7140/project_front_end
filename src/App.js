import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import InitialPage from './pages/initialpage/InitialPage';
import UserSIgnup from './pages/userSignup/UserSIgnup';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import UserLogin from './pages/userLogin/UserLogin';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Account from './pages/account/Account';
import UserProfile from './pages/userProfile/UserProfile'
import Search from './pages/search_by_category/Search';
import Navbar from './components/navbar/Navbar';
import {useSelector} from "react-redux"

function App() {
 const user = useSelector((state)=> state.user.users)
 
  console.log(user);
 
  return (
   
    <Router>
       
      <Navbar/>
      
        {!user ? <Switch>
          <Route path='/About us' component={AboutUs}/>
    <Route path='/contact us' component={ContactUs}/>
          <Route path='/Sign in' exact component={UserLogin}/>
     <Route path='/Sign up' exact component={UserSIgnup}/>
     <Route path='/' exact component={InitialPage} />
        </Switch>:
        <Switch>
   <Route path='/search_by_category' component={Search}/>
  <Route path='/Account' component={Account}/>
    <Route path='/Profile' component={Profile}/>
    <Route path='/userProfile' component={UserProfile}/>
    <Route path='/home page' component={Home}/>
    <Redirect to="/home page" />    
        </Switch>
        }
     
   </Router>
    
  );
}

export default App;
