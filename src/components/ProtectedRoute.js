import React from 'react';
import {Navigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProtectedRoute = ({children}) => {
    const { user } = UserAuth();
    //if the person has not legally logged in
    if (!user){
        //toast.warning('You are not loggen in!');
        return <Navigate to='/' />
    }else if (user.email==="admin@gmail.com"){
        //toast.warning('You are an admin!');
        return <Navigate to='/' />
    };
    return children;
};

export default ProtectedRoute;