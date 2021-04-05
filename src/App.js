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
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={InitialPage} />
        <Route path='/About us' component={AboutUs}/>
        <Route path='/contact us' component={ContactUs}/>
        <Route path='/Sign in' component={UserLogin}/>
        <Route path='/Sign up' component={UserSIgnup}/>
        <Route path='/home page' component={Home}/>
        <Route path='/Profile' component={Profile}/>
        <Route path='/Account' component={Account}/>
      </Switch>
   </Router>
    
  );
}

export default App;
