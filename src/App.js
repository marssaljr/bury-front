import React, { useContext } from 'react';
import './App.css';
import { AuthContext } from './contexts/authContext';
import Protected from './components/protected';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home'
import Unprotected from './components/unprotected';
import Register from './pages/register';


function App() {
  const { signed } = useContext(AuthContext);
  console.log(signed)

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Unprotected isLoggedIn={signed}>
              <Login />
            </Unprotected>} />
          <Route path="*" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
          <Protected isLoggedIn={signed}><Dashboard />
          </Protected>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
