import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='footer-container'>
        <section className='footer-contact'>
            <p className='footer-contact-heading'>
                Contact Us!
            </p>
            <p className='footer-contact-text'>
              HOWARD UNIVERSITY
            </p>
            <p className='footer-contact-text'>2400 Sixth Street NW</p>
            <p className='footer-contact-text'>Washington, DC 20059</p>
            <p className='footer-contact-text'>Phone: 202-806-6100</p>
            <p className='footer-contact-text'>HU.Aim.Ahead@workmail.com</p>
            <p className='footer-contact-text-copyright'>Howard University © 2022</p>
        </section>
    </div>
  )
}

export default Footer