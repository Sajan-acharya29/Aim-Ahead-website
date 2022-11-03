import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, addDoc} from "firebase/firestore";
import {Navigate, useNavigate} from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import calming from '../../videos/waves.mp4';
import emailjs from "emailjs-com";
import '../UserRequests.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { async } from '@firebase/util';

toast.configure();


function UserRequests() {
    //const adminemail= process.env.REACT_APP_ADMIN_EMAIL
    //const admipass= process.env.REACT_APP_ADMIN_APP
    const {createUser, logout, signIn} = UserAuth();
    const [users, setUsers] = useState([]);
    const [caregivers, setCaregivers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const caregiverCollectionRef = collection(db, "Add_Caregiver_Request");
    const validcaregiverCollectionRef = collection(db, "Valid_Caregivees");
    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        //Navigate("/user-requests")
        toast.success("New User Request Declined.")
    };
    const deleteCaregiverRequest = async (id) => {
      const caregiverDoc = doc(db, "Add_Caregiver_Request", id);
      await deleteDoc(caregiverDoc);
      toast.success("New Caregivee assignment Request Declined.")
  };
    const handleit = async (event, email, pass, id) => {
        event.preventDefault();
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        const subject = "A New User Has Been Validated";
        const message = "Admin has accepted this new user, keep this email for records."
        emailjs.send('service_505ya5d', 'template_v64bobd',{
            subject: subject,
            email: email,
            message: message,
            }, 'gNgFDv4QXw3TS90T9');
        toast.success("New User Created and Contacted!");
        await createUser(email, pass);
        //so that new user doesn't automatically login
        logout();
        //signIn(adminemail, admipass);
        //Navigate("/user-requests")
        
    }
    const createAssignment = async (caregivee, caregiver, id, caregiverID) => {
      await addDoc(validcaregiverCollectionRef, {Caregivee: caregivee, Caregiver: caregiver, Elderly_ID: id});
      const caregiverDoc = doc(db, "Add_Caregiver_Request", caregiverID);
      await deleteDoc(caregiverDoc);
      toast.success("New Caregiver Assignment Validated!");
    };
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            //fetching data form firestore and storing in data structure array
            setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
        };
        getUsers();

        const getCaregivers = async () => {
          const caregiver_data = await getDocs(caregiverCollectionRef);
          //fetching data form firestore and storing in data structure array
          setCaregivers(caregiver_data.docs.map((doc)=>({...doc.data(), id: doc.id})))

        };
        getCaregivers();
    }, []);

    return (
    <div>
        <video src= {calming} autoPlay loop muted/>
      {users.map((user) => {
        return (
          <div className='content-section-container'>
                <h2> New User Request:</h2>
                <h2>Full Name: {user.Full_Name}</h2>
                <h2>Elderly's Name: {user.Elderly_Name}</h2>
                <h2>Home Address: {user.Home_Address}</h2>
                <h2>Phone Number: {user.Phone_Number}</h2>
                <h2>Email: {user.Email}</h2>
                <button onClick={(event) => {handleit(event, user.Email, user.Requested_PasswordL, user.id)}} className='btn-accept'> Accept </button>
                <button onClick={() => {deleteUser(user.id)}} className='btn-decline'> Decline </button>
          </div>
        );
      })}
      {caregivers.map((caregiver) => {
        return(
        <div className='content-section-container'>
        <h2> New Caregivee Assignment Request:</h2>
        <h2>Elderly's Full Name: {caregiver.Full_Name}</h2>
        <h2>ID Number: {caregiver.ID}</h2>
        <h2>Requesting Email address: {caregiver.Requesting_Email}</h2>
        <button onClick={() => {createAssignment(caregiver.Full_Name, caregiver.Requesting_Email, caregiver.ID, caregiver.id)}}className='btn-accept'> Accept </button>
        <button onClick={() => {deleteCaregiverRequest(caregiver.id)}} className='btn-decline'> Decline </button>
        </div>
      )})}
    </div>
  );
};

export default UserRequests;