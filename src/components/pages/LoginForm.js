import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login.css";

toast.configure();
const Signin = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {signIn, forgotPassword} = UserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
      if(email==="admin@gmail.com"){
        toast.error("You are an Admin!");
        navigate('/');
      }else{
      await signIn(email, password);
      navigate('/caregiver');
      toast.success('Logged in Successfully')
      }
    }catch (e){
      toast.warn("Invalid Email/Password")
      setError(e.message);
      // for testing console.log(e.message);
    };
  };
  const forgotPasswordHandler = () =>{
    forgotPassword(email);
    toast.success("Password Reset Email sent! Check you're Spam folder!")
  };

  return (
    <form className='outer' onSubmit={handleSubmit}>
        <div className="form-inner">
            <h2>LOGIN</h2>
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"/>
            </div>
            <button className='btn'>LOGIN</button>
            <p onClick={forgotPasswordHandler} className='forgot-pass'>Forgot Password?</p>

        </div>
    </form>
  )
}

export default Signin;