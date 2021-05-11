import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import InitialPage from './pages/initialpage/InitialPage';
import UserSIgnup from './pages/userSignup/UserSIgnup';
import AboutUs from './pages/aboutUs/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import UserLogin from './pages/userLogin/UserLogin';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Account from './pages/account/Account';
import UserProfile from './pages/userProfile/UserProfile'
import AuthService from './auth/AuthService';
import Search from './pages/search_by_category/Search';
import Navbar from './components/navbar/Navbar';
function App() {
  const user =AuthService.getCurrentUser();
  console.log(user);
  
  return (
   
    <Router>
       
      <Navbar/>
      <Switch>
      <Route path='/search_by_category' component={Search}/>
    <Route path='/About us' component={AboutUs}/>
    <Route path='/contact us' component={ContactUs}/>
    <Route path='/home page' component={Home}/>
    <Route path='/Account' component={Account}/>
    <Route path='/Profile' component={Profile}/>
    <Route path='/userProfile' component={UserProfile}/>
    <Route path='/Sign in' exact component={UserLogin}/>
     <Route path='/Sign up' exact component={UserSIgnup}/>
     <Route path='/' exact component={InitialPage} />
     <Route path='*'>404 not found</Route>
   </Switch>
   </Router>
    
  );
}

export default App;
