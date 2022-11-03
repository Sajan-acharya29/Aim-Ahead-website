import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/pages/SignUp';
import Signin from './components/pages/LoginForm';
import AdminLogin from './components/pages/AdminLogin';
import CareGiver from './components/pages/CareGiver';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import SecuredRoute from './components/SecuredRoute';
import { AuthContextProvider } from './context/AuthContext';
import AdminHome from './components/pages/AdminHome';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import UserRequests from './components/pages/UserRequests';
import CareGiverInfo from './components/pages/CareGiverInfo';
import WebcamStream from './components/pages/WebcamStream';
function App() {
  return (
    <>
      <AuthContextProvider>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" exact element={<SecuredRoute><Home /></SecuredRoute>}/>
        <Route path='/services' exact element={<SecuredRoute><Services/></SecuredRoute>}/>
        <Route path='/sign-up' exact element={<SecuredRoute><Signup/></SecuredRoute>}/>
        <Route path='/admin-login' exact element={<SecuredRoute><AdminLogin/></SecuredRoute>}/>
        <Route path='/login' exact element={<SecuredRoute><Signin/></SecuredRoute>}/>
        <Route path='/caregiver' exact element={<ProtectedRoute>{<CareGiver/>}</ProtectedRoute>}/>
        <Route path='/caregiver-info/:type/:elderly_id' exact element={<ProtectedRoute>{<CareGiverInfo/>}</ProtectedRoute>}/>
        <Route path='/caregiver-stream/:elderly_id' exact element={<ProtectedRoute>{<WebcamStream/>}</ProtectedRoute>}/>
        <Route path='/admin-dash' exact element={<AdminProtectedRoute><AdminHome/></AdminProtectedRoute>}/>
        <Route path='/user-requests' exact element={<AdminProtectedRoute><UserRequests/></AdminProtectedRoute>}/>
        </Routes>
        <Footer/>
      </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
