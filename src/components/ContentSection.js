import React from 'react';
import './ContentSection.css';
import { Button } from './Button';
import '../App.css';
import homevideo from '../videos/Home_Video.mp4'
import { Link } from 'react-router-dom';
import "./Navbar.css";
function ContentSection() {
  return (
    <div className='content-section-container'>
        <video src= {homevideo} autoPlay loop muted/>
        <h1>Welcome Caregiver "checking at 2.20 PM" </h1>
        <p>Please Login</p>
        <div className='content-section-btns'>
            <Button className='sign-up' buttonStyle='btn--outline' buttonSize='btn--large'> <Link to="/login" className='nav-links-alt'>
                       LOGIN
                    </Link></Button>
            <Button className='admin-login' buttonStyle='btn--primary' buttonSize='btn--large'>
            <Link to="/admin-login" className='nav-links-alt'>
                       Admin Login
                    </Link></Button>
        </div>
    </div>
  );
}

export default ContentSection;