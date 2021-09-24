import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import BestBooks from './BestBooks';


class App extends React.Component {

  

  render() {
    return (
      <>
        <Router>

          <Header />

          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login onLoginSubmit={this.loginHandler} handleFormInput={this.formInputHandler} />}
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/test">
              <h2>this is a test </h2>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
