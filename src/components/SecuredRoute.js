import React from 'react';
import {Navigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SecuredRoute = ({children}) => {
    const { user } = UserAuth();
    //if the person is not logged in
    if (!user){
    }else if(user.email!=="admin@gmail.com"){
        //toast.warning('You are still logged in, please logout to navigate here!');
        //console.log(user);
        return <Navigate to='/caregiver' />;
    } else if (user.email==="admin@gmail.com"){
        //toast.warning('You are still logged in admin, please logout to navigate here!');
        return <Navigate to='/admin-dash' />;
        
    };
    return children;
};

export default SecuredRoute;