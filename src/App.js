import { Suspense, lazy } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';
import ErrorBoundary from './hoc/ErrorBoundary';

import Hero from './components/Hero/Hero';
import Navigation from './Containers/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Login from './Containers/Login/Login';
import SignUp from './Containers/SignUp/SignUp';
import Home from './Containers/Home/Home';
import Profile from './Containers/Profile/Profile';
import Create from './Containers/Create/Create';
import Details from './Containers/Details/Details';
import MyArticles from './Containers/MyArticles/MyArticles';
import Update from './Containers/Update/Update';
import Loader from './components/UI/Loader/Loader';
// import ForgotPassword from './components/Forms/ForgotPassword';
// import ContactUs from './Containers/ContactUs/ContactUs';
// import About from './components/About/About';
const ForgotPassword = lazy(() => import('./Containers/ForgotPassword/ForgotPassword'));
const ContactUs = lazy(() => import('./Containers/ContactUs/ContactUs'));
const About = lazy(() => import('./components/About/About'));

function App() {
  return (
    <>
      <Navigation />
      <ErrorBoundary>
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
          <Suspense fallback={<Loader />}>
            <PublicRoute path='/forgot-password' component={ForgotPassword} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={ContactUs} />
          </Suspense>
          <Redirect from='/' to='/' />
        </Switch>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
