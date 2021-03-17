import { Switch, Route } from 'react-router-dom';

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
// import Loader from './components/UI/Loader/Loader';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <PrivateRoute path='/' exact component={Home} />
        <PublicRoute path='/hero' component={Hero} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/signup' component={SignUp} />
        <PublicRoute path='/forgot-password' component={ForgotPassword} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={ContactUs} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
