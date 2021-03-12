import { Switch, Route } from 'react-router-dom';

import Hero from './components/Hero/Hero';
import Navigation from './Containers/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Login from './components/Forms/Login';
import ForgotPassword from './components/Forms/ForgotPassword';
import SignUp from './components/Forms/SignUp';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Hero} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/forgot-password' component={ForgotPassword} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;