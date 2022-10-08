import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
          <Routes>
            <Route path='/' element={() => <Navigate to='/posts' />} />
            <Route path='/posts' element={<Home />} />
            <Route path='/posts/search' element={<Home />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/auth' element={() => (!user ? <Auth /> : <Navigate to='/posts' />)} />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;