import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import InitialPage from './pages/initialpage/InitialPage';
import UserSIgnup from './pages/userSignup/UserSIgnup';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import UserLogin from './pages/userLogin/UserLogin';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import UserProfile from './pages/userProfile/UserProfile'
import Search from './pages/search_by_category/Search';
import Navbar from './components/navbar/Navbar';
import {useSelector} from "react-redux"
import ActionAlerts from './pages/admin/Verification';
import Alerts from './pages/admin/AdminVerified';
import ProtectedRoute from './ProtectedRoute';
import ForgetPassword from './pages/userLogin/ForgetPassword';

function App() {
 const user = useSelector((state)=> state.user.users)

 
 
  return (
  
    <Router>
      
      <Navbar/>
     
      <Switch>
        {user && user.role === "admin" ? <><ProtectedRoute path='/verified Users' component={Alerts} user={user}/>
    <ProtectedRoute path='/verification' component={ActionAlerts} user={user}/>
     <Redirect to="/verification"/> </>:
     user && user.role === "user" ? <>
     <ProtectedRoute path='/search_by_category' component={Search} user={user}/>
   <ProtectedRoute path='/Account' component={Account} user={user}/>
     <ProtectedRoute path='/userProfile' component={UserProfile} user={user}/>
     <ProtectedRoute path="/home page" component={Home} user={user}/>
     <Redirect to="/home page" />    
     </>:<>
     <Route path='/About us' component={AboutUs}/>
    <Route path='/contact us' component={ContactUs}/>
   
    <Route path='/forgot password' component={ForgetPassword}/>
          <Route path='/Sign in' exact component={UserLogin}/>
     <Route path='/Sign up' exact component={UserSIgnup}/>
     <Route path='/' exact component={InitialPage} />   
     </>
     }
        
   
    
    
    
        </Switch>
        
      
   </Router>
   
   
  );
}

export default App;
