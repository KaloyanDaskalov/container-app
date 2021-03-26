import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';

import Hero from './components/Hero/Hero';
import Navigation from './Containers/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Login from './components/Forms/Login';
import ForgotPassword from './components/Forms/ForgotPassword';
import SignUp from './components/Forms/SignUp';
import Home from './Containers/Home/Home';
import About from './components/About/About';
import ContactUs from './components/ContactUs/ContactUs';
import Profile from './components/Profile/Profile';
import Create from './Containers/Create/Create';
import Details from './Containers/Details/Details';
import MyArticles from './Containers/MyArticles/MyArticles';
import Update from './Containers/Update/Update';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/create' component={Create} />
        <PrivateRoute path='/details/:id' component={Details} />
        <PrivateRoute path='/update/:id' component={Update} />
        <PrivateRoute path='/my-articles' component={MyArticles} />
        <PublicRoute path='/hero' component={Hero} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/signup' component={SignUp} />
        <PublicRoute path='/forgot-password' component={ForgotPassword} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={ContactUs} />
        <Redirect from='/' to='/' />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
