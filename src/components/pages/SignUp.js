import React, { useState, useEffect } from 'react';
import "../SignUp.css";
import { db } from '../../firebase';
import {useNavigate} from 'react-router-dom';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Signup = () =>{
    //a-sync function for handeling the new user submissions
    const [newName, setNewName] = useState("") ;
    const [newElderly, setNewElderly] = useState("") ;
    const [newAddress, setNewAddress] = useState("") ;
    const [newNumber, setNewNumber] = useState("") ;
    const [newEmail, setNewEmail] = useState("") ;
    const [newPass, setNewPass] = useState("") ;
    const [users, setUsers] = useState([]);
    const [emailError, setemailError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [nameError, setnameError] = useState('');
    const [elderlyError, setelderlyError] = useState('');
    const [addressError, setaddressError] = useState('');
    const [numberError, setnumberError] = useState('');
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate();
    //for email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const createUser = async () => {
        if (newEmail===""){
            setemailError("Empty Email");
        }else if(newPass.length < 5){
            setpasswordError("Password must be 6 characters or longer")
        }else if(newName===""){
            setnameError("Name is blank");
        }else if(newElderly===""){
            setelderlyError("Elderly's name is blank");
        }else if(newNumber.length<10){
            setnumberError("Phone Number needs to be 10 digits long");
        }
        else if(newAddress===""){
            setaddressError("Blank address")
        }
        else if(emailRegex.test(newEmail)){
            await addDoc(usersCollectionRef, {Full_Name: newName, Elderly_Name: newElderly, Home_Address: newAddress, Phone_Number: newNumber, Email: newEmail, Requested_PasswordL: newPass});
            navigate('/');
            toast.success("Successfully sent New User Request, you will soon be contacted when admin validate your credentials!")
        }
        else{
            setemailError("Invalid Email");
        }
    }
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            //fetching data form firestore and storing in data structure array
            setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
        };
        getUsers();
    }, []);
    return(
        <div className='outer'>
        <div className="form-inner">
            <h2>Create Account</h2>
            <div className="form-group">
                <label htmlFor='name'>Full Name (CareGiver): </label>
                <input onChange={(event) => {setNewName(event.target.value);}} type="text"  name="name" id="name" />
                {nameError&&<div className='msg-error'>{nameError}</div>}
            </div>
            <div className="form-group">
                <label htmlFor='eldername'>Elderly's Name: </label>
                <input onChange={(event) => {setNewElderly(event.target.value);}} type="text"  name="eldername" id="eldername" />
                {elderlyError&&<div className='msg-error'>{elderlyError}</div>}
            </div>
            <div className="form-group">
                <label htmlFor='home'>Home Address: </label>
                <input onChange={(event) => {setNewAddress(event.target.value);}} type="text"  name="home" id="home" />
                {addressError&&<div className='msg-error'>{addressError}</div>}
            </div>
            <div className="form-group">
                <label htmlFor='phone'>Phone Number: </label>
                <input onChange={(event) => {setNewNumber(event.target.value);}} type="text"  name="phone" id="phone" />
                {numberError&&<div className='msg-error'>{numberError}</div>}
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input onChange={(event) => {setNewEmail(event.target.value);}} type="email" name="email" id="email"/>
                {emailError&&<div className='msg-error'>{emailError}</div>}
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password: </label>
                <input onChange={(event) => {setNewPass(event.target.value);}} type="password" name="password" id="password" />
                {passwordError&&<div className='msg-error'>{passwordError}</div>}
            </div>
            <button className='btn' onClick={createUser}>Create User</button> 

        </div>
        </div>
    )
}
export default Signup;