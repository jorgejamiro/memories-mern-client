import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId="995430738861-nvgkcjno3s5i8ek2sj0gorhlqgfe20tv.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxwidth='lg'>
          <NavBar />
          <Switch>
            <Route path='/' exact component={() => <Redirect to='/posts' />} />
            <Route path='/posts' exact component={Home} />
            <Route path='/posts/search' exact component={Home} />
            <Route path='/posts/:id' component={PostDetails} />
            <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;