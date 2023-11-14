import React, { useEffect, useState } from 'react'
import './login.css'
import profilepic from './profile.png'
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({user,setUser}) => {

    const [form,setForm] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        return navigation("/");
      }
    }, []);

    const navigation = useNavigate();

    const [errors,setErrors] = useState(null);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    };

    const handleSubmit = async()=>{
        console.log(form);

        const result = await login(form);
        console.log(result);
        setErrors(null);

        if (result.status === 200) {
            if (result.data.status === 200) {
              localStorage.setItem("user", JSON.stringify(result.data.data));
              navigation("/");
              return;
            }
      
            if (result.data.status === 201) {
              setErrors(result.data.data);
              return;
            }
      
            if (result.data.status === 202) {
              toast(result.data.message);
              return;
            }
          }
        
    };

    return (
        <>
            <div className="main-container">
            <ToastContainer style={{fontSize:"15px",padding:"10px"}} />
                <img src={profilepic} alt=""></img>
                <div className="sc">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Enter Username" name='username' onChange={handleChange}></input>
                </div>
                <div className="sc">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Enter Password" name='password' onChange={handleChange}></input>
                </div>
                <button className="login" onClick={handleSubmit}>Login</button>
            </div>
        </>
    )
}

export default Login
