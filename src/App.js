import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import UserSIgnup from './pages/userSignup/UserSIgnup';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import UserLogin from './pages/userLogin/UserLogin';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import UserProfile from './pages/userProfile/UserProfile'
import Search from './pages/search_by_category/Search';
import Nav from './components/navbar/Nav';
import {useSelector} from "react-redux"
import ActionAlerts from './pages/admin/Verification';
import Alerts from './pages/admin/AdminVerified';
import ProtectedRoute from './ProtectedRoute';
import ForgetPassword from './pages/userLogin/ForgetPassword';
import Reports from './pages/admin/Reports';
import ResetPassword from './pages/userLogin/ResetPassword';
import Post from './components/card/PostDetails';
import AllPost from './pages/allPost/AllPost';
import WeeklyPost from './pages/WeekPost/WeeklyPost';
import Solution from './pages/solution/Solution';

function App() {
 const user = useSelector((state)=> state.user.users)
 
 

 
 
  return (
  
    <Router>
      
      <Nav/>
     
      <Switch>
        {user && user.role === "admin" ? <>
        <ProtectedRoute path='/reports' component={Reports} user={user}/>
        <ProtectedRoute path='/verified Users' component={Alerts} user={user}/>
    <ProtectedRoute path='/verification' component={ActionAlerts} user={user}/>
     <Redirect to="/verification"/> </>:
     user && user.role === "user" ? <>
     <ProtectedRoute path='/Solution' component={Solution}  user={user}/>
    <ProtectedRoute path='/postDetails' component={Post} user={user}/>
    <ProtectedRoute path='/Weekly Top Picks' component={WeeklyPost} user={user}/>
    <ProtectedRoute path='/AllPosts' component={AllPost} user={user}/>
     <ProtectedRoute path='/search_by_category' component={Search} user={user}/>
   <ProtectedRoute path='/Account' component={Account} user={user}/>
     <ProtectedRoute path='/userProfile' component={UserProfile} user={user}/>
     <ProtectedRoute path="/home page" component={Home} user={user}/>
     <Redirect to="/home page" />    
     </>:<>
     <Route path='/resetPassword/:token' component={ResetPassword}/>
     <Route path='/About us' component={AboutUs}/>
    <Route path='/contact us' component={ContactUs}/>
   
    <Route path='/forgot password' component={ForgetPassword}/>
          
     <Route path='/Sign up' exact component={UserSIgnup}/>
     <Route path='/' exact component={UserLogin}/>
     
     </>
     }
        
   
    
    
    
        </Switch>
        
      
   </Router>
   
   
  );
}

export default App;
