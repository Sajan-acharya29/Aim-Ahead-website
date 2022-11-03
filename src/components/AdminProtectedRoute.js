import React from 'react';
import {Navigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminProtectedRoute = ({children}) => {
    const { user } = UserAuth();
    //if the person has not legally logged in
    if (!user){
        //toast.warning('You are not logged in yet!');
        return <Navigate to='/' />
    }else if(user.email!=="admin@gmail.com"){
        //toast.warning('You are not logged in as an admin!');
        //console.log(user && user.email)
        return <Navigate to='/' />
        };
    return children;
};

export default AdminProtectedRoute;