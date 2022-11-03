import '../AdminLogin.css';
import React, {useState} from 'react';
import adminlogin from '../../videos/AdminLogin.mp4';
import {useNavigate} from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Signin = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {signIn} = UserAuth();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try{
        if (email==="admin@gmail.com"){
          await signIn(email, password);
          navigate('/admin-dash');
          toast.success('Logged in Successfully'); 
        }else{
            toast.error("Nice try... You are not an admin! Please Login normally!")
        };
      }catch (e){
        toast.warn("Invalid Email/Password")
      };
    };
  return (
    <div className='outside' onSubmit={handleSubmit}>
        <video src= {adminlogin} autoPlay loop muted/>
        <form className='outers'>
        <div className="form-inner">
            <h2>ADMIN LOGIN</h2>
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password:</label>
                <input onChange={(e) => setPassword(e.target.value)}  type="password" name="password" id="password"/>
            </div>
            <button className='btn'>LOGIN</button>

        </div>
    </form>
        </div>
  );
};

export default Signin;