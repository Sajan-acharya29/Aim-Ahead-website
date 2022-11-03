import React, {useState, useEffect} from 'react';
import modalpic from '../images/modal.JPG';
import './Cards.css';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


const CalModal = ({open, onClose}) => {
    const {user} = UserAuth();
    const usersCollectionRef = collection(db, "Add_Caregiver_Request");
    const createRequest = async () => {
        if (newElderly===""){
            setnameError("Blank Name!");
        }else if(newid.length !== 8){
            setidError("ID must be 8 characters long")
            setnameError("");
        }else{
        setidError("")
        setnameError("");
        onClose();
        await addDoc(usersCollectionRef, {Full_Name: newElderly, ID: newid, Requesting_Email: user.email});
        toast.success("Request sent to admin!");
        };
    };
    //for input and listeners
    const [newElderly, setNewElderly] = useState("") ;
    const [newid, setNewid] = useState("") ;
    const [newtime, setNewTime] = useState("") ;
    //errors
    const [nameError, setnameError] = useState('');
    const [idError, setidError] = useState('');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            //fetching data form firestore and storing in data structure array
            setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
        };
        getUsers();
    }, []);
    if(!open) return null
    return (
    <div onClick={onClose} className='overlay'>
       <div onClick={(e) => { e.stopPropagation()}}className='modalcontainer'>
        <img src={modalpic} alt = "Cargiving Doctor"/>
        <div className='modalRight'>
            <p onClick={onClose}className="closeBtn">X</p>
            <div className='content'>
                <h1 className='modalHeading'>Add New Task</h1>
                <input onChange={(event) => {setNewid(event.target.value);}} placeholder='Activity'/>
                {idError&&<div className='msg-error-modal'>{idError}</div>}
                <input onChange={(event) => {setNewElderly(event.target.value);}} placeholder='Day(s)'/>
                {nameError&&<div className='msg-error-modal'>{nameError}</div>}
                <input onChange={(event) => {setNewTime(event.target.value);}} placeholder='Times'/>
                {nameError&&<div className='msg-error-modal'>{nameError}</div>}
            </div>
            <div className='btnContainer'>
                <button onClick={createRequest}className='btnPrimary'>
                    <span className='bold'>ADD</span>
                </button>
            </div>
        </div>
       </div>
    </div>
  )
}

export default CalModal;