import React, { useState } from 'react';
import '../../App.css';
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cards from '../Cards';
import Modal from '../Modal';
const CareGiver = () =>{
    const {user, logout} = UserAuth();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [newElderly, setNewElderly] = useState("") ;
    const credentials = user.email;
    const handleLogout= async() =>{
        try{
            await logout()
            navigate('/')
            toast.success('Successfully logged out');
            //console.log("Logged out")
        }catch(e){
            //console.log(e.message)
        };
    };
    return (
    <>
    <div onClick={() => setOpenModal(false)}>
    <p className='loggedin'>Logged in as: {user && user.email}</p>
    <h1 className='Caregiver'>Welcome CareGiver!</h1>
    <Cards userEmail={credentials}/>
    </div>
    <div className='new_caregiver_area'>
        <button className='loggingout' onClick={() => setOpenModal(true)}>
                        ADD ELDERLY</button>
        <Modal open={openModal} onClose={() => setOpenModal(false)}/> 
    </div>
    <button className='loggingout' onClick={handleLogout}>LOGOUT</button>
    </>
    );
};

export default CareGiver;