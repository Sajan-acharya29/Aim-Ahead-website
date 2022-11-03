import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';
const mystyles = ['btn--primary', 'btn--outline'];
const mysizes = ['btn--medium', 'btn--large'];

export const Button = ({children, type, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = mystyles.includes(buttonStyle) ? buttonStyle:mystyles[0]
    const checkButtonSize = mysizes.includes(buttonSize) ? buttonSize:mysizes[0];
    return(
        <Link to='/sign-up' className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                {children}
            </button>
        </Link>
    )
};
