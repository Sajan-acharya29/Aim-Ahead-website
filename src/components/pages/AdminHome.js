import React from 'react';
import '../../App.css';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import admindash from '../../videos/Admin_Dashboard.mp4';
import { Button } from '../Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminHome = () =>{
    const {user, logout} = UserAuth();
    const email = (user && user.email);
    const navigate = useNavigate();
    const handleLogout= async() =>{
        try{
            await logout();
            navigate('/');
            toast.success('Successfully logged out');
        }catch(e){
            console.log(e.message)
        };
    };
    return (
        <div className='content-section-container'>
    <video src= {admindash} autoPlay loop muted/>
    <h1 className='admin-header'>Welcome Admin!</h1>
    <Button className='sign-up' buttonStyle='btn--outline' buttonSize='btn--large'> <Link to="/user-requests" className='nav-links-alt'>
                       Handle Requests
                    </Link></Button>
            <Button className='admin-login' buttonStyle='btn--primary' buttonSize='btn--large'>
            <Link to="/user-requests" className='nav-links-alt'>
                       Global Analytics
                    </Link></Button>
    <Button className='admin-login' onClick={handleLogout}>LOGOUT</Button>
    </div>
    );

}
export default AdminHome;