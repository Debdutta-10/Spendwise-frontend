import React, { useEffect, useState } from 'react';
import './register.css';
import profilepic from './profile.png';
import { register } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await register(form);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("Something went wrong");
    }
  }

  return (
    <>
      <div className="main-container2">
      <ToastContainer />
        <img src={profilepic} alt="" />
        <div className="sc2">
          <label htmlFor="name">Name</label>
          <input type="text" name='name' id="name" placeholder="Enter Name" onChange={handleInputChange} />
        </div>
        <div className="sc2">
          <label htmlFor="username">Username</label>
          <input type="text" name='username' id="username" placeholder="Enter Username" onChange={handleInputChange} />
        </div>
        <div className="sc2">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id="email" placeholder="abcd@gmail.com" onChange={handleInputChange} />
        </div>
        <div className="sc2">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" placeholder="Enter Password" onChange={handleInputChange} />
        </div>
        <button className="login2" onClick={handleSubmit}>Register</button>
      </div>
    </>
  );
};

export default Register;
