import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro'
function Navbar() {
  const [click, setClick] = useState(false);
  //reversing/alternating clicks
  const handleClick = () => setClick(!click);
  //for mobile func showButton
  const [button, setButton] = useState(true);

  const closeMobileMenu = () => setClick(false);
  const showButton = () =>{
    if(window.innerWidth <=960){
        setButton(false);
    }else{
        setButton(true);
    }
  };
  //listenes for resizing 
  window.addEventListener('resize', showButton);

  //stop resizing-default-state when refreshed
  useEffect(() =>{
    showButton()
  }, [])
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Howard Aim-Ahead Initiative<FontAwesomeIcon icon={solid('hospital-user')} />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times': 'fas fa-bars'}/>
            </div>
            <ul className={click ? 'nav-menu active': 'nav-menu'}>
                <li className='nav-item'>
                    <Link to="/" className='nav-links' onClick={closeMobileMenu}>
                       Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to="/sign-up" className='nav-links-mobile' onClick={closeMobileMenu}>
                        Sign Up
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to="/services" className='nav-links' onClick={closeMobileMenu}>
                        services
                    </Link>
                </li>

            </ul>
            {button && <Button buttonstyle= 'btn--outline'>Sign Up</Button>}
        </div>
    </nav>
    </>
  );
}

export default Navbar